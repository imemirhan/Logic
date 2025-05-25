using ApplicationCore.Entities.JobAggregate;
using ApplicationCore.Entities.JobSeekerAggregate;
using ApplicationCore.Interfaces;
using ApplicationCore.Specifications;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;
using PublicApi.JobEndpoints;

namespace PublicApi.JobSeekerEndpoints;

public class GetRecommendedJobsEndpoint : IEndpoint<IResult, GetRecommendedJobsRequest, IJobRecommendationService, IRepository<Job>>
{
    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapPost("/jobseekers/{jobSeekerId}/recommendations", async (
                int jobSeekerId,
                [FromBody] GetRecommendedJobsRequest request,
                [FromServices] IJobRecommendationService recommendationService,
                [FromServices] IRepository<Job> jobRepository) =>
            {
                request.JobSeekerId = jobSeekerId;
                return await HandleAsync(request, recommendationService, jobRepository);
            })
        .WithName("GetRecommendedJobs")
        .WithDescription("Get recommended jobs for a job seeker")
        .Produces<GetRecommendedJobsResponse>(StatusCodes.Status200OK)
        .WithTags("JobSeeker Endpoints");
    }

    public async Task<IResult> HandleAsync(GetRecommendedJobsRequest request, IJobRecommendationService recommendationService, IRepository<Job> jobRepository)
    {
        // Validate JobSeeker existence - optional depending on service's behavior
        var recommendedJobIds = await recommendationService.GetRecommendedJobIdsAsync(request.JobSeekerId);

        if (recommendedJobIds == null || !recommendedJobIds.Any())
        {
            // Return empty list if no recommendations found
            var emptyResponse = new GetRecommendedJobsResponse(request.CorrelationId())
            {
                RecommendedJobs = new List<JobReadDto>()
            };
            return Results.Ok(emptyResponse);
        }

        var jobSpec = new GetRecommendedJobsById(recommendedJobIds);
        var jobs = await jobRepository.ListAsync(jobSpec);

        // Map jobs to DTO
        var jobDtos = jobs.Select(j => new JobReadDto
        {
            Id = j.Id,
            EmployerId = j.EmployerId,
            Title = j.Title,
            Description = j.Description,
            Location = j.Location,
            EType = j.EType,
            SalaryRange = j.SalaryRange,
            PostedDate = j.PostedDate,
            ExpirationDate = j.ExpirationDate,
            IsRemote = j.IsRemote,
            Status = j.Status,
            ApplicantCount = j.ApplicantCount,
            CreatedAt = j.CreatedAt,
            UpdatedAt = j.UpdatedAt
        }).ToList();

        var response = new GetRecommendedJobsResponse(request.CorrelationId())
        {
            RecommendedJobs = jobDtos
        };

        return Results.Ok(response);
    }
}

using ApplicationCore.Entities.JobAggregate;
using ApplicationCore.Interfaces;
using ApplicationCore.Specifications;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.JobEndpoints;

public class GetJobsByEmployerIdEndpoint : IEndpoint<IResult, GetJobsByEmployerIdRequest, IRepository<Job>>
{
    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapGet("api/jobs/employer/{employerId:int}",
                async (int employerId, IRepository<Job> jobRepo) =>
                {
                    var request = new GetJobsByEmployerIdRequest(employerId);
                    return await HandleAsync(request, jobRepo);
                })
            .WithName("GetJobsByEmployerId")
            .WithDescription("Gets all job postings by a specific employer ID")
            .Produces<GetJobsByEmployerIdResponse>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status404NotFound)
            .WithTags("Job Endpoints");
    }

    public async Task<IResult> HandleAsync(GetJobsByEmployerIdRequest request, IRepository<Job> jobRepo)
    {
        var response = new GetJobsByEmployerIdResponse(request.CorrelationId());
        var jobSpec = new GetJobsByEmployerIdSpec(request.EmployerId);
        var jobs = await jobRepo.ListAsync(jobSpec);

        if (jobs == null || !jobs.Any())
        {
            return Results.NotFound($"No jobs found for employer ID {request.EmployerId}.");
        }

        response.Jobs = jobs.Select(job => new JobReadDto
        {
            Id = job.Id,
            EmployerId = job.EmployerId,
            Title = job.Title,
            Description = job.Description,
            Location = job.Location,
            EType = job.EType,
            SalaryRange = job.SalaryRange,
            PostedDate = job.PostedDate,
            ExpirationDate = job.ExpirationDate,
            IsRemote = job.IsRemote,
            Status = job.Status,
            ApplicantCount = job.ApplicantCount,
            CreatedAt = job.CreatedAt,
            UpdatedAt = job.UpdatedAt
        }).ToList();

        return Results.Ok(response);
    }
}

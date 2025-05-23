using ApplicationCore.Entities.JobAggregate;
using ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.JobEndpoints;

public class GetRecentJobsEndpoint : IEndpoint<IResult, GetRecentJobsRequest, (IRepository<Job> jobRepo, IJobService jobService)>
{
    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapGet("/api/jobs/recent", 
                async ([FromServices] IRepository<Job> jobRepo, [FromServices] IJobService jobService) =>
                {
                    // you can create a dummy request or skip it since it's empty
                    var request = new GetRecentJobsRequest();

                    var response = await HandleAsync(request, (jobRepo, jobService));
                    return response;
                })
            .WithName("GetRecentJobs")
            .WithDescription("Returns the 5 most recent jobs that are 2 days old or younger.")
            .Produces<GetRecentJobsResponse>(StatusCodes.Status200OK)
            .WithTags("Job Endpoints");

    }

    public async Task<IResult> HandleAsync(GetRecentJobsRequest request, (IRepository<Job> jobRepo, IJobService jobService) services)
    {
        var response = new GetRecentJobsResponse(request.CorrelationId());

        // Call the service method that returns the filtered recent jobs
        var recentJobs = await services.jobService.GetRecentJobsAsync();

        response.Jobs = recentJobs.Select(job => new JobReadDto
        {
            Id = job.Id,
            Title = job.Title,
            Description = job.Description,
            SalaryRange = job.SalaryRange,
            CreatedAt = job.CreatedAt,
            UpdatedAt = job.UpdatedAt,
            Location = job.Location,
            EmployerId = job.EmployerId,
            ExpirationDate = job.ExpirationDate
        }).ToList();

        return Results.Ok(response);
    }
}
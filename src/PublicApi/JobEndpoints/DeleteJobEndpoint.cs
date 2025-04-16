using ApplicationCore.Entities.JobAggregate;
using ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.JobEndpoints;

public class DeleteJobEndpoint : IEndpoint<IResult, DeleteJobRequest, IRepository<Job>, IRepository<JobApplication>>
{
    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapDelete("api/jobs/{jobId}", 
                async ([AsParameters] DeleteJobRequest request, IRepository<Job> jobRepository, IRepository<JobApplication> jobApplicationRepository) =>
                {
                    return await HandleAsync(request, jobRepository, jobApplicationRepository);
                })
            .WithName("DeleteJob")
            .WithDescription("Deletes a job by its ID")
            .Produces<DeleteJobResponse>(StatusCodes.Status200OK)
            .Produces<DeleteJobResponse>(StatusCodes.Status404NotFound)
            .WithTags("Job Endpoints");
    }

    public async Task<IResult> HandleAsync(DeleteJobRequest request, IRepository<Job> jobRepository, IRepository<JobApplication> jobApplicationRepository)
    {
        var response = new DeleteJobResponse(request.CorrelationId());

        var existingJob = await jobRepository.GetByIdAsync(request.JobId);

        if (existingJob == null)
        {
            response.IsDeleted = false;
            return Results.NotFound(response);
        }
        await jobRepository.DeleteAsync(existingJob);
        response.IsDeleted = true;
        return Results.Ok(response);
    }
}


using ApplicationCore.Entities.JobAggregate;
using ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.JobEndpoints;

public class GetJobByIdEndpoint : IEndpoint<IResult, GetJobByIdRequest, IRepository<Job>>
{
    public GetJobByIdEndpoint() { }

    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapGet("api/jobs/{jobId:int}",
                async (int jobId, IRepository<Job> jobRepo) =>
                {
                    var request = new GetJobByIdRequest(jobId);
                    return await HandleAsync(request, jobRepo);
                })
            .WithName("GetJobById")
            .WithDescription("Gets a job by ID")
            .Produces<GetJobByIdResponse>(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status404NotFound)
            .WithTags("Job Endpoints");
    }

    public async Task<IResult> HandleAsync(GetJobByIdRequest request, IRepository<Job> jobRepo)
    {
        var response = new GetJobByIdResponse(request.CorrelationId());

        var job = await jobRepo.GetByIdAsync(request.JobId);
        if (job == null)
        {
            return Results.NotFound($"Job with ID {request.JobId} not found.");
        }

        response.Job = new JobReadDto
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
        };

        return Results.Ok(response);
    }
}

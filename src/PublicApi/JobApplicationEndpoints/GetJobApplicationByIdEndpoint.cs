using ApplicationCore.Entities.JobAggregate;
using ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.JobApplicationEndpoints;

public class GetJobApplicationByIdEndpoint 
    : IEndpoint<IResult, GetJobApplicationByIdRequest, IRepository<JobApplication>>
{
    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapGet("api/job-applications/{id:int}",
                async (int id, IRepository<JobApplication> repo) =>
                {
                    var request = new GetJobApplicationByIdRequest { Id = id };
                    return await HandleAsync(request, repo);
                })
            .WithName("GetJobApplicationById")
            .WithDescription("Gets a job application by ID")
            .Produces<GetJobApplicationByIdResponse>(StatusCodes.Status200OK)
            .WithTags("Job Application Endpoints");
    }

    public async Task<IResult> HandleAsync(GetJobApplicationByIdRequest request, IRepository<JobApplication> repo)
    {
        var response = new GetJobApplicationByIdResponse(request.CorrelationId());

        var jobApp = await repo.GetByIdAsync(request.Id);

        if (jobApp == null)
            return Results.NotFound($"Job application with ID {request.Id} not found.");

        response.JobApplication = new JobApplicationReadDto
        {
            Id = jobApp.Id,
            JobId = jobApp.JobId,
            JobSeekerId = jobApp.JobSeekerId,
            CoverLetter = jobApp.CoverLetter,
            Status = jobApp.Status,
            InterviewScheduledDate = jobApp.InterviewScheduledDate,
            InterviewNotes = jobApp.InterviewNotes,
            EmployerFeedback = jobApp.EmployerFeedback,
            CreatedAt = jobApp.CreatedAt,
            UpdatedAt = jobApp.UpdatedAt
        };

        return Results.Ok(response);
    }
}

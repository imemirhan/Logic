using ApplicationCore.Entities.JobAggregate;
using ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.JobApplicationEndpoints;

public class GetAllJobApplicationsEndpoint : IEndpoint<IResult, GetAllJobApplicationsRequest, IRepository<JobApplication>>
{
    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapGet("api/job-applications",
                async (IRepository<JobApplication> repo) =>
                {
                    var request = new GetAllJobApplicationsRequest();
                    return await HandleAsync(request, repo);
                })
            .WithName("GetAllJobApplications")
            .WithDescription("Gets all job applications")
            .Produces<GetAllJobApplicationsResponse>(StatusCodes.Status200OK)
            .WithTags("Job Application Endpoints");
    }

    public async Task<IResult> HandleAsync(GetAllJobApplicationsRequest request, IRepository<JobApplication> repo)
    {
        var response = new GetAllJobApplicationsResponse(request.CorrelationId());

        var jobApplications = await repo.ListAsync();

        response.JobApplications = jobApplications.Select(app => new JobApplicationReadDto
        {
            Id = app.Id,
            JobId = app.JobId,
            JobSeekerId = app.JobSeekerId,
            EmployerId = app.EmployerId,
            CoverLetter = app.CoverLetter,
            Status = app.Status,
            InterviewScheduledDate = app.InterviewScheduledDate,
            InterviewNotes = app.InterviewNotes,
            EmployerFeedback = app.EmployerFeedback,
            CreatedAt = app.CreatedAt,
            UpdatedAt = app.UpdatedAt
        }).ToList();

        return Results.Ok(response);
    }
}

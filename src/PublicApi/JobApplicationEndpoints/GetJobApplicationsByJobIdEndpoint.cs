using ApplicationCore.Entities.JobAggregate;
using ApplicationCore.Interfaces;
using ApplicationCore.Specifications;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.JobApplicationEndpoints;

public class GetJobApplicationsByJobIdEndpoint 
    : IEndpoint<IResult, GetJobApplicationsByJobIdRequest, IRepository<JobApplication>>
{
    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapGet("api/job-applications/job/{jobId:int}",
                async (int jobId, IRepository<JobApplication> repo) =>
                {
                    var request = new GetJobApplicationsByJobIdRequest { JobId = jobId };
                    return await HandleAsync(request, repo);
                })
            .WithName("GetJobApplicationsByJobId")
            .WithDescription("Gets all job applications for a specific job")
            .Produces<GetJobApplicationsByJobIdResponse>(StatusCodes.Status200OK)
            .WithTags("Job Application Endpoints");
    }

    public async Task<IResult> HandleAsync(GetJobApplicationsByJobIdRequest request, IRepository<JobApplication> repo)
    {
        var response = new GetJobApplicationsByJobIdResponse(request.CorrelationId());

        var spec = new JobApplicationsByJobIdSpec(request.JobId);
        var apps = await repo.ListAsync(spec);

        response.JobApplications = apps.Select(app => new JobApplicationReadDto
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


using ApplicationCore.Entities.JobAggregate;
using ApplicationCore.Interfaces;
using ApplicationCore.Specifications;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.JobApplicationEndpoints;

public class GetJobApplicationsByJobSeekerIdEndpoint 
    : IEndpoint<IResult, GetJobApplicationsByJobSeekerIdRequest, IRepository<JobApplication>>
{
    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapGet("api/job-applications/job-seeker/{jobSeekerId:int}",
                async (int jobSeekerId, IRepository<JobApplication> repo) =>
                {
                    var request = new GetJobApplicationsByJobSeekerIdRequest { JobSeekerId = jobSeekerId };
                    return await HandleAsync(request, repo);
                })
            .WithName("GetJobApplicationsByJobSeekerId")
            .WithDescription("Gets all job applications for a specific job seeker")
            .Produces<GetJobApplicationsByJobSeekerIdResponse>(StatusCodes.Status200OK)
            .WithTags("Job Application Endpoints");
    }

    public async Task<IResult> HandleAsync(GetJobApplicationsByJobSeekerIdRequest request, IRepository<JobApplication> repo)
    {
        var response = new GetJobApplicationsByJobSeekerIdResponse(request.CorrelationId());

        var spec = new JobApplicationsByJobSeekerIdSpec(request.JobSeekerId);
        var apps = await repo.ListAsync(spec);

        response.JobApplications = apps.Select(app => new JobApplicationReadDto
        {
            Id = app.Id,
            JobId = app.JobId,
            JobSeekerId = app.JobSeekerId,
            JobSeeker = app.JobSeeker,
            EmployerId = app.EmployerId,
            Employer = app.Employer,
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

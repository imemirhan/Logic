using ApplicationCore.Entities.JobAggregate;
using ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.JobApplicationEndpoints;

public class CreateJobApplicationEndpoint
    : IEndpoint<IResult, CreateJobApplicationRequest, IRepository<JobApplication>>
{
    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapPost("api/job-applications",
                async (CreateJobApplicationRequest request, IRepository<JobApplication> repo) =>
                {
                    return await HandleAsync(request, repo);
                })
            .WithName("CreateJobApplication")
            .WithDescription("Creates a new job application")
            .Produces<CreateJobApplicationResponse>(StatusCodes.Status201Created)
            .WithTags("Job Application Endpoints");
    }

    public async Task<IResult> HandleAsync(CreateJobApplicationRequest request, IRepository<JobApplication> repo)
    {
        var response = new CreateJobApplicationResponse(request.CorrelationId());

        var dto = request.JobApplication;

        var jobApp = new JobApplication(
            jobId: dto.JobId,
            employerId: dto.EmployerId,
            jobSeekerId: dto.JobSeekerId,
            coverLetter: dto.CoverLetter
        );

        var created = await repo.AddAsync(jobApp);

        response.JobApplication = new JobApplicationReadDto
        {
            Id = created.Id,
            JobId = created.JobId,
            JobSeekerId = created.JobSeekerId,
            CoverLetter = created.CoverLetter,
            Status = created.Status,
            InterviewScheduledDate = created.InterviewScheduledDate,
            InterviewNotes = created.InterviewNotes,
            EmployerFeedback = created.EmployerFeedback,
            CreatedAt = created.CreatedAt,
            UpdatedAt = created.UpdatedAt
        };

        return Results.Created($"/api/job-applications/{created.Id}", response);
    }
}

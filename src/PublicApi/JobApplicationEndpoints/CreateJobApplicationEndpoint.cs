using ApplicationCore.Entities.JobAggregate;
using ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.JobApplicationEndpoints;

public class CreateJobApplicationEndpoint
    : IEndpoint<IResult, CreateJobApplicationRequest,
        (IRepository<JobApplication> repo, IJobService jobService)>
{
    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapPost("api/job-applications",
                [Authorize(Roles = Shared.Authorization.Constants.Roles.JOBSEEKER,
                    AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
                async (CreateJobApplicationRequest request,
                    IRepository<JobApplication> repo,
                    IJobService jobService) =>
                {
                    return await HandleAsync(request, (repo, jobService));
                })
            .WithName("CreateJobApplication")
            .WithDescription("Creates a new job application")
            .Produces<CreateJobApplicationResponse>(StatusCodes.Status201Created)
            .WithTags("Job Application Endpoints");
    }

    public async Task<IResult> HandleAsync(CreateJobApplicationRequest request,
        (IRepository<JobApplication> repo, IJobService jobService) services)
    {
        var (repo, jobService) = services;

        var response = new CreateJobApplicationResponse(request.CorrelationId());
        var dto = request.JobApplication;

        await jobService.IncrementApplicationCountAsync(dto.JobId);

        var existingApplications = await repo.ListAsync();
        var alreadyExists = existingApplications.Any(a =>
            a.JobId == dto.JobId && a.JobSeekerId == dto.JobSeekerId);

        if (alreadyExists)
        {
            return Results.Conflict($"Job seeker {dto.JobSeekerId} has already applied to job {dto.JobId}.");
        }

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
            EmployerId = created.EmployerId,
            CoverLetter = created.CoverLetter,
            Status = created.Status,
            CreatedAt = created.CreatedAt,
            UpdatedAt = created.UpdatedAt
        };

        return Results.Created($"/api/job-applications/{created.Id}", response);
    }
}

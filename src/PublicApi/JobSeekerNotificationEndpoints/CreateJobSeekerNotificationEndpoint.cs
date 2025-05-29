using ApplicationCore.Entities.JobSeekerAggregate;
using ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.JobSeekerNotificationEndpoints;

public class CreateJobSeekerNotificationEndpoint
    : IEndpoint<IResult, CreateJobSeekerNotificationRequest, IRepository<JobSeekerNotifications>>
{
    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapPost("api/jobseeker-notifications",
            [Authorize(Roles = Shared.Authorization.Constants.Roles.EMPLOYER, AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
            async (CreateJobSeekerNotificationRequest request, IRepository<JobSeekerNotifications> repo) =>
            {
                return await HandleAsync(request, repo);
            })
            .WithName("CreateJobSeekerNotification")
            .WithDescription("Creates a new notification for a job seeker")
            .Produces<CreateJobSeekerNotificationResponse>(StatusCodes.Status201Created)
            .WithTags("Job Seeker Notifications");
    }

    public async Task<IResult> HandleAsync(CreateJobSeekerNotificationRequest request, IRepository<JobSeekerNotifications> repo)
    {
        var response = new CreateJobSeekerNotificationResponse(request.CorrelationId());

        var dto = request.Notification;

        var notification = new JobSeekerNotifications(
            jobId: dto.JobId,
            employerId: dto.EmployerId,
            jobSeekerId: dto.JobSeekerId,
            forStatus: dto.ForStatus,
            forInterview: dto.ForInterview,
            status: dto.Status,
            interviewId: dto.InterviewId
        );

        var created = await repo.AddAsync(notification);

        response.Notification = new JobSeekerNotificationReadDto
        {
            Id = created.Id,
            JobId = created.JobId,
            JobSeekerId = created.JobSeekerId,
            EmployerId = created.EmployerId,
            ForStatus = created.ForStatus,
            ForInterview = created.ForInterview,
            Status = created.Status,
            InterviewId = created.InterviewId,
            IsOpened = created.IsOpened,
            CreatedAt = created.CreatedAt
        };

        return Results.Created($"/api/jobseeker-notifications/{created.Id}", response);
    }
}

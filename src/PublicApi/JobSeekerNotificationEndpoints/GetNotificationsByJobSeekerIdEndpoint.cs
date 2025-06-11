using ApplicationCore.Entities.JobSeekerAggregate;
using ApplicationCore.Interfaces;
using ApplicationCore.Specifications;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.JobSeekerNotificationEndpoints;

public class GetNotificationsByJobSeekerIdEndpoint
    : IEndpoint<IResult, GetNotificationsByJobSeekerIdRequest, IRepository<JobSeekerNotifications>>
{
    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapGet("api/jobseeker-notifications/{jobSeekerId}",
                [Authorize(Roles = Shared.Authorization.Constants.Roles.JOBSEEKER,
                    AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
                async (int jobSeekerId, IRepository<JobSeekerNotifications> repo) =>
                {
                    var request = new GetNotificationsByJobSeekerIdRequest { JobSeekerId = jobSeekerId };
                    return await HandleAsync(request, repo);
                })
            .WithName("GetNotificationsByJobSeekerId")
            .WithDescription("Gets all notifications for a specific job seeker")
            .Produces<GetNotificationsByJobSeekerIdResponse>(StatusCodes.Status200OK)
            .WithTags("Job Seeker Notifications");
    }

    public async Task<IResult> HandleAsync(GetNotificationsByJobSeekerIdRequest request,
        IRepository<JobSeekerNotifications> repo)
    {
        var notifySpec = new GetNotificationsByJobSeekerIdSpec(request.JobSeekerId);
        var notifications = await repo.ListAsync(notifySpec);

        var response = new GetNotificationsByJobSeekerIdResponse(request.CorrelationId())
        {
            Notifications = notifications.Select(n => new JobSeekerNotificationReadDto
            {
                Id = n.Id,
                JobId = n.JobId,
                Job = n.Job == null ? null : new NotifJobDto
                {
                    Name = n.Job.Title
                },
                JobSeekerId = n.JobSeekerId,
                EmployerId = n.EmployerId,
                Employer = n.Employer == null
                    ? null
                    : new NotifEmpDto
                    {
                        Name = n.Employer.Name,
                    },
                ForStatus = n.ForStatus,
                ForInterview = n.ForInterview,
                Status = n.Status == null ? null : n.Status.ToString(),
                InterviewId = n.InterviewId,
                Interview = n.Interview == null
                    ? null
                    : new InterviewDto
                    {
                        InterviewLink = n.Interview.InterViewLink,
                        ScheduledDate = n.Interview.InterviewScheduledDate
                    },
                IsOpened = n.IsOpened,
                Message = n.Message,
                CreatedAt = n.CreatedAt
            }).ToList()
        };

        return Results.Ok(response);
    }
}
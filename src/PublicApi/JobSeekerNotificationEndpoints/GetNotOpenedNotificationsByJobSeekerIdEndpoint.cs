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

public class GetNotOpenedNotificationsByJobSeekerEndpoint
    : IEndpoint<IResult, GetNotOpenedNotificationsByJobSeekerRequest, IRepository<JobSeekerNotifications>>
{
    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapGet("api/jobseeker-notifications/{jobSeekerId}/not-opened",
            [Authorize(Roles = Shared.Authorization.Constants.Roles.JOBSEEKER, AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
            async (int jobSeekerId, IRepository<JobSeekerNotifications> repo) =>
            {
                var request = new GetNotOpenedNotificationsByJobSeekerRequest { JobSeekerId = jobSeekerId };
                return await HandleAsync(request, repo);
            })
            .WithName("GetNotOpenedNotificationsByJobSeeker")
            .WithDescription("Gets all unopened notifications for a specific job seeker")
            .Produces<GetNotOpenedNotificationsByJobSeekerResponse>(StatusCodes.Status200OK)
            .WithTags("Job Seeker Notifications");
    }

    public async Task<IResult> HandleAsync(GetNotOpenedNotificationsByJobSeekerRequest request, IRepository<JobSeekerNotifications> repo)
    {
        var notifySpec = new GetNotOpenedMailsByJobSeekerIdSpec(request.JobSeekerId);
        var notifications = await repo.ListAsync(notifySpec);

        var response = new GetNotOpenedNotificationsByJobSeekerResponse(request.CorrelationId())
        {
            Notifications = notifications.Select(n => new JobSeekerNotificationReadDto
            {
                Id = n.Id,
                JobId = n.JobId,
                JobSeekerId = n.JobSeekerId,
                EmployerId = n.EmployerId,
                ForStatus = n.ForStatus,
                ForInterview = n.ForInterview,
                Status = n.Status,
                Message = n.Message,
                InterviewId = n.InterviewId,
                IsOpened = n.IsOpened,
                CreatedAt = n.CreatedAt
            }).ToList()
        };

        return Results.Ok(response);
    }
}

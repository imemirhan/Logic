using ApplicationCore.Entities.InterviewAggregate;
using ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.InterviewEndpoints;

public class UpdateInterviewEndpoint
    : IEndpoint<IResult, UpdateInterviewRequest, IRepository<Interviews>>
{
    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapPut("api/interviews/{id}",
            [Authorize(Roles = Shared.Authorization.Constants.Roles.EMPLOYER, 
                AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
            async (int id, UpdateInterviewRequest request, IRepository<Interviews> repo) =>
            {
                request.Id = id;
                return await HandleAsync(request, repo);
            })
            .WithName("UpdateInterview")
            .WithDescription("Updates an existing interview")
            .Produces<UpdateInterviewResponse>(StatusCodes.Status200OK)
            .WithTags("Interview Endpoints");
    }

    public async Task<IResult> HandleAsync(UpdateInterviewRequest request, IRepository<Interviews> repo)
    {
        var response = new UpdateInterviewResponse(request.CorrelationId());

        var interview = await repo.GetByIdAsync(request.Id);
        if (interview is null)
        {
            return Results.NotFound($"Interview with ID {request.Id} not found.");
        }

        if (request.Interview.InterviewScheduledDate != null)
        {
            interview.PostponeInterview(request.Interview.InterviewScheduledDate.Value,
                                        request.Interview.InterViewLink);
        }

        if (request.Interview.IsAccepted != null)
            interview.SetAccepted(request.Interview.IsAccepted.Value);

        if (request.Interview.IsAttended != null)
            interview.SetAttended(request.Interview.IsAttended.Value);

        if (!string.IsNullOrWhiteSpace(request.Interview.EmployerFeedback))
            interview.SetFeedback(request.Interview.EmployerFeedback);

        if (!string.IsNullOrWhiteSpace(request.Interview.InterviewNotes))
            interview.SetNotes(request.Interview.InterviewNotes);

        interview.UpdatedAt = DateTime.UtcNow;
        await repo.UpdateAsync(interview);

        response.Interview = new InterviewReadDto
        {
            Id = interview.Id,
            JobId = interview.JobId,
            EmployerId = interview.EmployerId,
            JobSeekerId = interview.JobSeekerId,
            InterViewLink = interview.InterViewLink,
            InterviewScheduledDate = interview.InterviewScheduledDate,
            IsAccepted = interview.IsAccepted,
            IsAttended = interview.IsAttended,
            EmployerFeedback = interview.EmployerFeedback,
            InterviewNotes = interview.InterviewNotes,
            CreatedAt = interview.CreatedAt,
            UpdatedAt = interview.UpdatedAt
        };

        return Results.Ok(response);
    }
}

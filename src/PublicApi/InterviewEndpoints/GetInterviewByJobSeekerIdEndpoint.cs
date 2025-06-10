using ApplicationCore.Entities.InterviewAggregate;
using ApplicationCore.Interfaces;
using ApplicationCore.Specifications;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.InterviewEndpoints;

public class GetInterviewsByJobSeekerIdEndpoint 
    : IEndpoint<IResult, GetInterviewsByJobSeekerIdRequest, IRepository<Interviews>>
{
    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapGet("api/interviews/{jobSeekerId}",
            [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
            async (int jobSeekerId, IRepository<Interviews> repo) =>
            {
                var request = new GetInterviewsByJobSeekerIdRequest { JobSeekerId = jobSeekerId };
                return await HandleAsync(request, repo);
            })
            .WithName("GetInterviewsByJobSeekerId")
            .WithDescription("Gets all interviews for a specific job seeker")
            .Produces<GetInterviewsByJobSeekerIdResponse>(StatusCodes.Status200OK)
            .WithTags("Interview Endpoints");
    }

    public async Task<IResult> HandleAsync(
        GetInterviewsByJobSeekerIdRequest request, 
        IRepository<Interviews> repo)
    {
        var response = new GetInterviewsByJobSeekerIdResponse(request.CorrelationId());

        var interviews = await repo.ListAsync(new InterviewsByJobSeekerSpec(request.JobSeekerId));
        if (interviews == null || !interviews.Any())
        {
            return Results.NotFound($"No interviews found for Job Seeker ID {request.JobSeekerId}");
        }

        response.Interviews = interviews.Select(interview => new InterviewReadDto
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
        }).ToList();

        return Results.Ok(response);
    }
}
using ApplicationCore.Entities.InterviewAggregate;
using ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.InterviewEndpoints;

public class GetInterviewByIdEndpoint 
    : IEndpoint<IResult, GetInterviewByIdRequest, IRepository<Interviews>>
{
    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapGet("api/interviews/{id}",
            [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
            async (int id, IRepository<Interviews> repo) =>
            {
                var request = new GetInterviewByIdRequest { Id = id };
                return await HandleAsync(request, repo);
            })
            .WithName("GetInterviewById")
            .WithDescription("Gets interview details by ID")
            .Produces<GetInterviewByIdResponse>(StatusCodes.Status200OK)
            .WithTags("Interview Endpoints");
    }

    public async Task<IResult> HandleAsync(GetInterviewByIdRequest request, IRepository<Interviews> repo)
    {
        var response = new GetInterviewByIdResponse(request.CorrelationId());

        var interview = await repo.GetByIdAsync(request.Id);
        if (interview == null)
        {
            return Results.NotFound($"Interview with ID {request.Id} not found.");
        }

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

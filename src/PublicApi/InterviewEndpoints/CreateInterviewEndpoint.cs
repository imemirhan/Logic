using ApplicationCore.Entities.InterviewAggregate;
using ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.InterviewEndpoints;

public class CreateInterviewEndpoint
    : IEndpoint<IResult, CreateInterviewRequest,
        IRepository<Interviews>>
{
    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapPost("api/interviews",
                [Authorize(Roles = Shared.Authorization.Constants.Roles.EMPLOYER,
                    AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
                async (CreateInterviewRequest request,
                       IRepository<Interviews> repo) =>
                {
                    return await HandleAsync(request, repo);
                })
            .WithName("CreateInterview")
            .WithDescription("Creates a new interview")
            .Produces<CreateInterviewResponse>(StatusCodes.Status201Created)
            .WithTags("Interview Endpoints");
    }

    public async Task<IResult> HandleAsync(CreateInterviewRequest request,
        IRepository<Interviews> repo)
    {
        var response = new CreateInterviewResponse(request.CorrelationId());
        var dto = request.Interview;

        var interview = new Interviews(
            jobId: dto.JobId,
            employerId: dto.EmployerId,
            jobSeekerId: dto.JobSeekerId,
            interViewLink: dto.InterviewLink,
            interviewScheduledDate: dto.InterviewScheduledDate
        );

        var created = await repo.AddAsync(interview);

        response.Interview = new InterviewReadDto
        {
            Id = created.Id,
            JobId = created.JobId,
            JobSeekerId = created.JobSeekerId,
            EmployerId = created.EmployerId,
            InterViewLink = created.InterViewLink,
            InterviewScheduledDate = created.InterviewScheduledDate,
            IsAccepted = created.IsAccepted,
            IsAttended = created.IsAttended,
            InterviewNotes = created.InterviewNotes,
            EmployerFeedback = created.EmployerFeedback,
            CreatedAt = created.CreatedAt,
            UpdatedAt = created.UpdatedAt
        };

        return Results.Created($"/api/interviews/{created.Id}", response);
    }
}

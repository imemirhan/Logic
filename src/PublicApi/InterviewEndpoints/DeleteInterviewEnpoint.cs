using ApplicationCore.Entities.InterviewAggregate;
using ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.InterviewEndpoints;

public class DeleteInterviewEndpoint
    : IEndpoint<IResult, DeleteInterviewRequest, IRepository<Interviews>>
{
    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapDelete("api/interviews/{id}",
                [Authorize(Roles = Shared.Authorization.Constants.Roles.EMPLOYER, AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
                async (int id, IRepository<Interviews> repo) =>
                {
                    var request = new DeleteInterviewRequest { Id = id };
                    return await HandleAsync(request, repo);
                })
            .WithName("CancelInterview")
            .WithDescription("Marks an interview as canceled")
            .Produces<DeleteInterviewResponse>(StatusCodes.Status200OK)
            .WithTags("Interview Endpoints");
    }

    public async Task<IResult> HandleAsync(DeleteInterviewRequest request, IRepository<Interviews> repo)
    {
        var response = new DeleteInterviewResponse(request.CorrelationId());

        var interview = await repo.GetByIdAsync(request.Id);
        if (interview == null)
        {
            return Results.NotFound($"Interview with ID {request.Id} not found.");
        }

        interview.CancelInterview();
        await repo.UpdateAsync(interview);

        response.Message = $"Interview with ID {request.Id} has been canceled.";
        return Results.Ok(response);
    }
}
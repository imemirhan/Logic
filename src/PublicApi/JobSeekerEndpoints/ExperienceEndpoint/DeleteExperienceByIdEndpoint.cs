using ApplicationCore.Entities.JobSeekerAggregate;
using ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.JobSeekerEndpoints.ExperienceEndpoint;

public class DeleteExperienceByIdEndpoint : IEndpoint<IResult, DeleteExperienceRequest, IRepository<Experience>>
{
    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapDelete("api/experiences/{experienceId}",
                [Authorize(Roles = Shared.Authorization.Constants.Roles.ADMINISTRATORS, AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)] 
                async (int experienceId, IRepository<Experience> repository) =>
                {
                    return await HandleAsync(new DeleteExperienceRequest(experienceId), repository);
                })
            .Produces<DeleteExperienceResponse>()
            .WithTags("Experience Endpoints");
    }

    public async Task<IResult> HandleAsync(DeleteExperienceRequest request, IRepository<Experience> repository)
    {
        var response = new DeleteExperienceResponse(request.CorrelationId());

        var experienceToDelete = await repository.GetByIdAsync(request.ExperienceId);
        if (experienceToDelete is null)
            return Results.NotFound();

        await repository.DeleteAsync(experienceToDelete);

        return Results.Ok(response);
    }
}
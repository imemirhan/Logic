using ApplicationCore.Entities.JobSeekerAggregate;
using ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.JobSeekerEndpoints.SkillsEndpoint;

public class DeleteSkillByIdEndpoint : IEndpoint<IResult, DeleteSkillByIdRequest, IRepository<Skill>>
{
    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapDelete("api/skills/{skillId}",
                [Authorize(Roles = Shared.Authorization.Constants.Roles.ADMINISTRATORS, AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)] async
                    (int id, IRepository<Skill> repository) =>
                {
                    return await HandleAsync(new DeleteSkillByIdRequest(id) {SkillId = id}, repository);
                })
            .Produces<DeleteSkillByIdResponse>()
            .WithTags("Skill Endpoints");
    }
    public async Task<IResult> HandleAsync(DeleteSkillByIdRequest request, IRepository<Skill> repository)
    {
        var response = new DeleteSkillByIdResponse(request.CorrelationId());

        var itemToDelete = await repository.GetByIdAsync(request.SkillId);
        if (itemToDelete is null)
            return Results.NotFound();

        await repository.DeleteAsync(itemToDelete);

        return Results.Ok(response);
    }
}

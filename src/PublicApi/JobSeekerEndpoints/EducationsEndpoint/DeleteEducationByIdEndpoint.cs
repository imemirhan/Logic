using ApplicationCore.Entities.JobSeekerAggregate;
using ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.JobSeekerEndpoints.EducationsEndpoint;

public class DeleteEducationByIdEndpoint : IEndpoint<IResult, DeleteEducationByIdRequest, IRepository<Education>>
{
    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapDelete("api/educations/{educationId}",
                [Authorize(Roles = Shared.Authorization.Constants.Roles.ADMINISTRATORS, AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)] async
                    (int id, IRepository<Education> repository) =>
                {
                    return await HandleAsync(new DeleteEducationByIdRequest(id) { EducationId = id }, repository);
                })
            .Produces<DeleteEducationByIdResponse>()
            .WithTags("Education Endpoints");
    }

    public async Task<IResult> HandleAsync(DeleteEducationByIdRequest request, IRepository<Education> repository)
    {
        var response = new DeleteEducationByIdResponse(request.CorrelationId());

        var itemToDelete = await repository.GetByIdAsync(request.EducationId);
        if (itemToDelete is null)
            return Results.NotFound();

        await repository.DeleteAsync(itemToDelete);

        return Results.Ok(response);
    }
}
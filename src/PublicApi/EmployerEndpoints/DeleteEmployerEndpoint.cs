using ApplicationCore.Entities.EmployerAggregate;
using ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.EmployerEndpoints;

public class DeleteEmployerEndpoint : IEndpoint<IResult, DeleteEmployerRequest, IRepository<Employer>>
{
    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapDelete("api/employers/{employerId}",
                [Authorize(Roles = Shared.Authorization.Constants.Roles.ADMINISTRATORS, AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)] async
                    (int employerId, IRepository<Employer> employerRepository) =>
                {
                    return await HandleAsync(new DeleteEmployerRequest(employerId), employerRepository);
                })
            .Produces<DeleteEmployerResponse>()
            .WithTags("EmployerEndpoints");
    }

    public async Task<IResult> HandleAsync(DeleteEmployerRequest request, IRepository<Employer> itemRepository)
    {
        var response = new DeleteEmployerResponse(request.CorrelationId());

        var itemToDelete = await itemRepository.GetByIdAsync(request.EmployerId);
        if (itemToDelete is null)
            return Results.NotFound();

        await itemRepository.DeleteAsync(itemToDelete);

        return Results.Ok(response);
    }
}
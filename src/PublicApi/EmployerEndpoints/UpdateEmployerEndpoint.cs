using ApplicationCore.Entities.EmployerAggregate;
using ApplicationCore.Interfaces;
using Ardalis.GuardClauses;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.EmployerEndpoints;

public class UpdateEmployerEndpoint :  IEndpoint<IResult, UpdateEmployerRequest, IRepository<Employer>>
{
    public UpdateEmployerEndpoint()
    {
        
    }
    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapPut("api/employers/{id:int}",
                [Authorize(Roles = Shared.Authorization.Constants.Roles.ADMINISTRATORS, AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)] async
                    (UpdateEmployerRequest request, IRepository<Employer> itemRepository) =>
                {
                    return await HandleAsync(request, itemRepository);
                })
            .Produces<UpdateEmployerResponse>()
            .WithTags("CatalogItemEndpoints");
    }

    public async Task<IResult> HandleAsync(UpdateEmployerRequest request, IRepository<Employer> itemRepository)
    {
        Guard.Against.Null(request.Name, nameof(request.Name));
        Guard.Against.Null(request.Surname, nameof(request.Surname));
        
        var response = new UpdateEmployerResponse(request.CorrelationId());

        var existingItem = await itemRepository.GetByIdAsync(request.EmployerId);
        if (existingItem == null)
        {
            return Results.NotFound();
        }
        await itemRepository.UpdateAsync(existingItem);

        var dto = new EmployerReadDto()
        {
            Id = existingItem.Id,
            Name = existingItem.Name,
            Surname = existingItem.Surname,
            CompanyName = existingItem.CompanyName,
            Description = existingItem.Description,
            Industry = existingItem.Industry,
            UpdatedAt = DateTime.UtcNow
        };
        response.Employer = dto;
        return Results.Ok(response);
    }
}
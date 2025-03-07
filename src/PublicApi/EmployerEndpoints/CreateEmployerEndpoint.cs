using ApplicationCore.Entities.EmployerAggregate;
using ApplicationCore.Interfaces;
using Ardalis.GuardClauses;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.EmployerEndpoints;

public class CreateEmployerEndpoint : IEndpoint<IResult, CreateEmployerRequest, IRepository<Employer>, UserManager<ApplicationUser>>
{
    public CreateEmployerEndpoint()
    {
        
    }
   
    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapPost("api/employers", 
                [Authorize(Roles = Shared.Authorization.Constants.Roles.ADMINISTRATORS,
                AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
            async (CreateEmployerRequest request, IRepository<Employer> itemRepository, UserManager<ApplicationUser> employerManager) =>
            {
                return await HandleAsync(request, itemRepository, employerManager);
            })
            .WithName("CreateEmployer")
            .WithDescription("Creates a new employer")
            .Produces<CreateEmployerResponse>(StatusCodes.Status201Created)
            .WithTags("EmployerEndpoints");
    }
    
    public async Task<IResult> HandleAsync(CreateEmployerRequest request, IRepository<Employer> employerRepository, UserManager<ApplicationUser> employerManager)
    {
        var response = new CreateEmployerResponse(request.CorrelationId());
        var appUser = new ApplicationUser
        {
            Id = request.CorrelationId().ToString(),
            UserName = request.Email,
            Email = request.Email,
            PhoneNumber = request.Phone
        };
        var result = await employerManager.CreateAsync(appUser, request.Password);
        
        
        var newItem = new Employer
        (
            request.CorrelationId().ToString(),
            request.Name,
            request.Surname,
            request.CompanyName,
            request.Description,
            request.Industry
        );
        if (!result.Succeeded)
        {
            return Results.BadRequest(result.Errors);
        };
        newItem = await employerRepository.AddAsync(newItem);

        var dto = new EmployerReadDto
        {
            Id = newItem.Id,
            IdentityGuid = newItem.IdentityGuid,
            Name = newItem.Name,
            Surname = newItem.Surname,
            CompanyName = newItem.CompanyName,
            ProfileImageUrl = newItem.ProfileImageUrl,
            LinkedIn = newItem.LinkedIn,
            GitHub = newItem.GitHub,
            Twitter = newItem.Twitter,
            Facebook = newItem.Facebook,
            Instagram = newItem.Instagram,
            WebsiteUrl = newItem.WebsiteUrl,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = null
        };
        response.Employer = dto;
        return Results.Ok(response);
    }

}
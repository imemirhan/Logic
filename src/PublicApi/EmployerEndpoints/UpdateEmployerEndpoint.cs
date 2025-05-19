using ApplicationCore.Entities.EmployerAggregate;
using ApplicationCore.Interfaces;
using Ardalis.GuardClauses;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.EmployerEndpoints;

public class UpdateEmployerEndpoint : IEndpoint<IResult, UpdateEmployerRequest, IRepository<Employer>>
{
    private readonly IMapper _mapper;

    public UpdateEmployerEndpoint(IMapper mapper)
    {
        _mapper = mapper;
    }

    public async Task<IResult> HandleAsync(UpdateEmployerRequest request, IRepository<Employer> repository)
    {
        Guard.Against.Null(request, nameof(request));
        Guard.Against.NullOrWhiteSpace(request.Name, nameof(request.Name));
        Guard.Against.NullOrWhiteSpace(request.Surname, nameof(request.Surname));
        Guard.Against.NullOrWhiteSpace(request.CompanyName, nameof(request.CompanyName));
        Guard.Against.NullOrWhiteSpace(request.Description, nameof(request.Description));
        Guard.Against.NullOrWhiteSpace(request.Industry, nameof(request.Industry));

        var existingEmployer = await repository.GetByIdAsync(request.EmployerId);
        if (existingEmployer == null)
        {
            return Results.NotFound($"Employer with ID {request.EmployerId} not found.");
        }

        // Update employer details
        existingEmployer.UpdateCompanyDetails(request.CompanyName, request.Description, request.Industry, request.WebsiteUrl ?? "", DateTime.UtcNow);
        existingEmployer.UpdateContactInfo(DateTime.UtcNow, request.LinkedIn, request.GitHub, request.Twitter, request.Facebook, request.Instagram);

        await repository.UpdateAsync(existingEmployer);

        var employerDto = _mapper.Map<EmployerReadDto>(existingEmployer);

        return Results.Ok(new UpdateEmployerResponse(request.CorrelationId()) { Employer = employerDto });
    }

    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapPut("api/employers/{id:int}",
                [Authorize(Roles = Shared.Authorization.Constants.Roles.EMPLOYER, 
                           AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
                async (int id, UpdateEmployerRequest request, IRepository<Employer> repository) =>
                {
                    request.EmployerId = id; // Ensure the ID from the route is set
                    return await HandleAsync(request, repository);
                })
            .Accepts<UpdateEmployerRequest>("application/json")
            .Produces<UpdateEmployerResponse>()
            .WithTags("EmployerEndpoints");
    }
}

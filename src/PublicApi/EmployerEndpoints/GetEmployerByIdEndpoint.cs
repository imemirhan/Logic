using ApplicationCore.Entities.EmployerAggregate;
using ApplicationCore.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;
using PublicApi.JobSeekerEndpoints;

namespace PublicApi.EmployerEndpoints;

public class GetEmployerByIdEndpoint : IEndpoint<IResult, GetEmployerByIdRequest, IRepository<Employer>>
{
    private readonly IMapper _mapper;

    public GetEmployerByIdEndpoint(IMapper mapper)
    {
        _mapper = mapper;
    }
    
    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapGet("api/employers/{employerId}", 
                async (int employerId, IRepository<Employer> employerRepository) =>
                {
                    return await HandleAsync(new GetEmployerByIdRequest { EmployerId = employerId }, employerRepository);
                })
            .Produces<GetEmployerByIdResponse>()
            .WithTags("EmployerEndpoints");
    }

    public async Task<IResult> HandleAsync(GetEmployerByIdRequest request, IRepository<Employer> repository)
    {
            var employer = await repository.GetByIdAsync(request.EmployerId);
            if (employer == null)
                return Results.NotFound($"Employer with ID {request.EmployerId} not found.");
            
            var employerByIdDto = _mapper.Map<EmployerReadDto>(employer);
            return Results.Ok(employerByIdDto);
    }
}
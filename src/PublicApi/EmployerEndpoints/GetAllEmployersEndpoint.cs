using ApplicationCore.Entities.EmployerAggregate;
using ApplicationCore.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.EmployerEndpoints;

public class GetEmployerEndpoints : IEndpoint<IResult, GetAllEmployersRequest, IRepository<Employer>>
{
    
    private readonly IMapper _mapper;

    public GetEmployerEndpoints(IMapper mapper)
    {
        _mapper = mapper;
    }
    
    public async Task<IResult> HandleAsync(GetAllEmployersRequest request, IRepository<Employer> repository)
    {
        var employers = await repository.ListAsync();
        var employerDtos = _mapper.Map<List<EmployerReadDto>>(employers);

        return Results.Ok(new GetAllEmployersResponse { Employers = employerDtos });
    }

    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapGet("api/employers",
                async (IRepository<Employer> employerRepository) =>
                {
                    return await HandleAsync(new GetAllEmployersRequest(), employerRepository);
                })
            .Produces<GetAllEmployersResponse>()
            .WithTags("EmployerEndpoints");
    }
}
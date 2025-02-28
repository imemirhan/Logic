using ApplicationCore.Entities.EmployerAggregate;
using ApplicationCore.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PublicApi.EmployerEndpoints
{
    public class EmployerEndpoints : IEndpoint<IResult, IRepository<Employer>>
    {
        private readonly IMapper _mapper;

        public EmployerEndpoints(IMapper mapper)
        {
            _mapper = mapper;
        }

        public void AddRoute(IEndpointRouteBuilder app)
        {
            app.MapGet("api/employers", HandleAsync)
                .Produces<List<EmployerReadDto>>(StatusCodes.Status200OK)
                .WithTags("EmployerEndpoints");
        }

        public async Task<IResult> HandleAsync(IRepository<Employer> employerRepository)
        {
            var employers = await employerRepository.ListAsync();
            var employerDtos = employers.Select(emp => _mapper.Map<EmployerReadDto>(emp)).ToList();
            return Results.Ok(employerDtos);
        }
    }
}
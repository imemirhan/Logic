using ApplicationCore.Entities.EmployerAggregate;
using ApplicationCore.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;
using System.Threading.Tasks;

namespace PublicApi.EmployerEndpoints
{
    public class GetEmployerByIdEndpoint : IEndpoint<IResult, IRepository<Employer>>
    {
        private readonly IMapper _mapper;

        public GetEmployerByIdEndpoint(IMapper mapper)
        {
            _mapper = mapper;
        }

        public void AddRoute(IEndpointRouteBuilder app)
        {
            app.MapGet("api/employers/{id:int}", async (int id, IRepository<Employer> employerRepository) =>
                {
                    return await HandleAsync(id, employerRepository);
                })
                .Produces<EmployerReadDto>(StatusCodes.Status200OK)
                .Produces(StatusCodes.Status404NotFound)
                .WithTags("EmployerEndpoints");
        }

        public async Task<IResult> HandleAsync(int id, IRepository<Employer> employerRepository)
        {
            var employer = await employerRepository.GetByIdAsync(id);
            if (employer == null)
            {
                return Results.NotFound($"Employer with ID {id} not found.");
            }

            var employerDto = _mapper.Map<EmployerReadDto>(employer);
            return Results.Ok(employerDto);
        }
    }
}
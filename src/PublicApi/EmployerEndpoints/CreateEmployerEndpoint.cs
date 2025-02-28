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
    public class CreateEmployerEndpoint : IEndpoint<IResult, IRepository<Employer>>
    {
        private readonly IMapper _mapper;

        public CreateEmployerEndpoint(IMapper mapper)
        {
            _mapper = mapper;
        }

        public void AddRoute(IEndpointRouteBuilder app)
        {
            app.MapPost("api/employers", HandleAsync)
                .Accepts<EmployerCreateDto>("application/json")
                .Produces<EmployerReadDto>(StatusCodes.Status201Created)
                .WithTags("EmployerEndpoints");
        }

        private async Task<IResult> HandleAsync(EmployerCreateDto employerDto, IRepository<Employer> employerRepository)
        {
            if (employerDto == null)
            {
                return Results.BadRequest("Employer data is required.");
            }

            var employer = _mapper.Map<Employer>(employerDto);
            await employerRepository.AddAsync(employer);

            var responseDto = _mapper.Map<EmployerReadDto>(employer);
            return Results.Created($"api/employers/{employer.Id}", responseDto);
        }
    }
}
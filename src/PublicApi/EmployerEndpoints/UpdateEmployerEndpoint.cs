using ApplicationCore.Entities.EmployerAggregate;
using ApplicationCore.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using System.Threading.Tasks;
using MinimalApi.Endpoint;

namespace PublicApi.EmployerEndpoints
{
    public class UpdateEmployerEndpoint : IEndpoint<IResult, IRepository<Employer>>
    {
        private readonly IMapper _mapper;

        public UpdateEmployerEndpoint(IMapper mapper)
        {
            _mapper = mapper;
        }
        
        public void AddRoute(IEndpointRouteBuilder app)
        {
            app.MapPut("api/employers/{id}", HandleAsync)
                .Accepts<EmployerUpdateDto>("application/json")
                .Produces<EmployerReadDto>(StatusCodes.Status200OK)
                .WithTags("EmployerEndpoints");
        }

        private async Task<IResult> HandleAsync(int id, EmployerUpdateDto employerDto, IRepository<Employer> employerRepository)
        {
            var existingEmployer = await employerRepository.GetByIdAsync(id);
            if (existingEmployer == null)
            {
                return Results.NotFound($"Employer with ID {id} not found.");
            }

            _mapper.Map(employerDto, existingEmployer);
            await employerRepository.UpdateAsync(existingEmployer);

            return Results.Ok(_mapper.Map<EmployerReadDto>(existingEmployer));
        }
    }
}
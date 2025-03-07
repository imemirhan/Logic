using ApplicationCore.Entities.EmployerAggregate;
using ApplicationCore.Entities.JobSeekerAggregate;
using ApplicationCore.Interfaces;
using AutoMapper;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.EmployerEndpoints
{
    public class EmployerEndpoints : IEndpoint<IResult, IRepository<Employer>>
    {
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;

        public EmployerEndpoints(IMapper mapper, UserManager<ApplicationUser> userManager)
        {
            _mapper = mapper;
            _userManager = userManager;
        }

        public void AddRoute(IEndpointRouteBuilder app)
        {

            app.MapGet("api/employers", GetAllEmployers)
                .WithName("GetAllEmployers")
                .WithDescription("Gets all employers")
                .Produces<List<EmployerReadDto>>(StatusCodes.Status200OK)
                .WithTags("EmployerEndpoints");

            app.MapGet("api/employers/{id:int}", GetEmployerById)
                .WithName("GetEmployerById")
                .WithDescription("Gets employer by id")
                .Produces<EmployerReadDto>(StatusCodes.Status200OK)
                .Produces(StatusCodes.Status404NotFound)
                .WithTags("EmployerEndpoints");

            app.MapPut("api/employers/{id:int}", UpdateEmployer)
                .WithName("UpdateEmployer")
                .WithDescription("Updates a new employer")
                .Accepts<EmployerUpdateDto>("application/json")
                .Produces<EmployerReadDto>(StatusCodes.Status200OK)
                .Produces(StatusCodes.Status404NotFound)
                .WithTags("EmployerEndpoints");

            app.MapDelete("api/employers/{id:int}", DeleteEmployer)
                .WithName("DeleteEmployer")
                .WithDescription("Deletes a employer")
                .Produces(StatusCodes.Status204NoContent)
                .Produces(StatusCodes.Status404NotFound)
                .WithTags("EmployerEndpoints");
        }

        
        private async Task<IResult> GetAllEmployers(IRepository<Employer> employerRepository)
        {
            var employers = await employerRepository.ListAsync();
            var employerDtos = _mapper.Map<List<EmployerReadDto>>(employers);
            return Results.Ok(employerDtos);
        }

        private async Task<IResult> GetEmployerById(int id, IRepository<Employer> employerRepository)
        {
            var employer = await employerRepository.GetByIdAsync(id);
            if (employer == null)
            {
                return Results.NotFound();
            }

            return Results.Ok(_mapper.Map<EmployerReadDto>(employer));
        }

        private async Task<IResult> UpdateEmployer(int id, EmployerUpdateDto employerDto, IRepository<Employer> employerRepository, UserManager<ApplicationUser> userManager)
        {
            var employer = await employerRepository.GetByIdAsync(id);
            if (employer == null)
            {
                return Results.NotFound();
            }

            _mapper.Map(employerDto, employer);
            employer.UpdatedAt = DateTime.UtcNow;
            await employerRepository.UpdateAsync(employer);

            return Results.Ok(_mapper.Map<EmployerReadDto>(employer));
        }

        private async Task<IResult> DeleteEmployer(int id, IRepository<Employer> employerRepository)
        {
            var employer = await employerRepository.GetByIdAsync(id);
            if (employer == null)
            {
                return Results.NotFound();
            }

            await employerRepository.DeleteAsync(employer);
            return Results.NoContent();
        }

        public Task<IResult> HandleAsync(IRepository<Employer> request)
        {
            throw new NotImplementedException();
        }
    }
}

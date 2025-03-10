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

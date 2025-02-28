using ApplicationCore.Entities.EmployerAggregate;
using ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using System.Threading.Tasks;
using MinimalApi.Endpoint;

namespace PublicApi.EmployerEndpoints
{
    public class DeleteEmployerEndpoint
    {
        public void AddRoute(IEndpointRouteBuilder app)
        {
            app.MapDelete("api/employers/{id}", HandleAsync)
                .Produces(StatusCodes.Status204NoContent)
                .Produces(StatusCodes.Status404NotFound)
                .WithTags("EmployerEndpoints");
        }

        private async Task<IResult> HandleAsync(int id, IRepository<Employer> employerRepository)
        {
            var employer = await employerRepository.GetByIdAsync(id);
            if (employer == null)
            {
                return Results.NotFound($"Employer with ID {id} not found.");
            }

            await employerRepository.DeleteAsync(employer);
            return Results.NoContent();
        }
    }
}
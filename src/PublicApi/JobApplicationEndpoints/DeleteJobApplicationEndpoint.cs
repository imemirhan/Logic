using ApplicationCore.Entities.JobAggregate;
using ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.JobApplicationEndpoints;

public class DeleteJobApplicationEndpoint 
    : IEndpoint<IResult, DeleteJobApplicationRequest, IRepository<JobApplication>>
{
    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapDelete("api/job-applications/{id:int}",
                [Authorize(Roles = Shared.Authorization.Constants.Roles.ADMINISTRATORS, 
                    AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
                async (int id, IRepository<JobApplication> repo) =>
                {
                    var request = new DeleteJobApplicationRequest { Id = id };
                    return await HandleAsync(request, repo);
                })
            .WithName("DeleteJobApplication")
            .WithDescription("Deletes a job application")
            .Produces<DeleteJobApplicationResponse>(StatusCodes.Status200OK)
            .WithTags("Job Application Endpoints");

    }

    public async Task<IResult> HandleAsync(DeleteJobApplicationRequest request, IRepository<JobApplication> repo)
    {
        var response = new DeleteJobApplicationResponse(request.CorrelationId());

        var jobApp = await repo.GetByIdAsync(request.Id);
        if (jobApp is null)
            return Results.NotFound($"Job application with id {request.Id} not found.");

        await repo.DeleteAsync(jobApp);

        response.DeletedJobApplicationId = request.Id;

        return Results.Ok(response);
    }
}

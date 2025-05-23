using ApplicationCore.Entities.JobSeekerAggregate;
using ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.JobSeekerEndpoints;

public class DeleteJobSeekerResumeEndpoint : IEndpoint<IResult, DeleteJobSeekerResumeRequest, IRepository<JobSeeker>>
{
    public async Task<IResult> HandleAsync(DeleteJobSeekerResumeRequest request, IRepository<JobSeeker> repository)
    {
        var jobSeeker = await repository.GetByIdAsync(request.JobSeekerId);
        if (jobSeeker == null)
        {
            return Results.NotFound("JobSeeker not found.");
        }

        jobSeeker.DeleteResume();
        await repository.UpdateAsync(jobSeeker);

        return Results.Ok("Resume deleted successfully.");
    }

    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapDelete("api/jobseekers/resume/{jobSeekerId:int}",
                [Authorize(Roles = Shared.Authorization.Constants.Roles.JOBSEEKER,
                    AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
                async ([FromRoute] int jobSeekerId, IRepository<JobSeeker> repository) =>
                {
                    var jobSeeker = await repository.GetByIdAsync(jobSeekerId);
                    if (jobSeeker == null)
                        return Results.NotFound("JobSeeker not found.");

                    jobSeeker.DeleteResume(); // Assume this sets the resume URL to null/empty
                    await repository.UpdateAsync(jobSeeker);

                    return Results.Ok("Resume deleted successfully.");
                })
            .Produces(StatusCodes.Status200OK)
            .Produces(StatusCodes.Status404NotFound)
            .WithTags("JobSeeker Endpoints");
    }
}
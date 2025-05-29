using ApplicationCore.Entities.JobAggregate;
using ApplicationCore.Interfaces;
using ApplicationCore.Specifications;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.JobApplicationEndpoints;

public class GetJobApplicationsByEmployerIdEndpoint 
    : IEndpoint<IResult, GetJobApplicationsByEmployerIdRequest, IRepository<JobApplication>>
{
    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapGet("api/job-applications/employer/{employerId:int}",
                async (int employerId, IRepository<JobApplication> repo) =>
                {
                    var request = new GetJobApplicationsByEmployerIdRequest { EmployerId = employerId };
                    return await HandleAsync(request, repo);
                })
            .WithName("GetJobApplicationsByEmployerId")
            .WithDescription("Gets all job applications for a specific employer")
            .Produces<GetJobApplicationsByEmployerIdResponse>(StatusCodes.Status200OK)
            .WithTags("Job Application Endpoints");
    }

    public async Task<IResult> HandleAsync(GetJobApplicationsByEmployerIdRequest request, IRepository<JobApplication> repo)
    {
        var response = new GetJobApplicationsByEmployerIdResponse(request.CorrelationId());

        var spec = new JobApplicationsByEmployerIdSpec(request.EmployerId);
        var apps = await repo.ListAsync(spec);

        response.JobApplications = apps.Select(app => new JobApplicationReadDto
        {
            Id = app.Id,
            JobId = app.JobId,
            EmployerId = app.EmployerId,
            Employer = app.Employer,
            JobSeekerId = app.JobSeekerId,
            JobSeeker = app.JobSeeker,
            CoverLetter = app.CoverLetter,
            Status = app.Status,
            CreatedAt = app.CreatedAt,
            UpdatedAt = app.UpdatedAt
        }).ToList();

        return Results.Ok(response);
    }
}

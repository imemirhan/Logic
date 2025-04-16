using ApplicationCore.Entities.JobAggregate;
using ApplicationCore.Interfaces;
using ApplicationCore.Specifications;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.JobEndpoints;

public class GetJobByNameEndpoint : IEndpoint<IResult, GetJobByNameRequest, IRepository<Job>>
{
    public GetJobByNameEndpoint() { }

    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapGet("api/jobs/name/{name}", 
                async (string name, IRepository<Job> jobRepo) =>
                {
                    var request = new GetJobByNameRequest(name);
                    return await HandleAsync(request, jobRepo);
                })
            .WithName("GetJobByName")
            .WithDescription("Gets all jobs with a matching name")
            .Produces<GetJobByNameResponse>(StatusCodes.Status200OK)
            .WithTags("Job Endpoints");
    }

    public async Task<IResult> HandleAsync(GetJobByNameRequest request, IRepository<Job> jobRepo)
    {
        var response = new GetJobByNameResponse(request.CorrelationId());

        var jobs = await jobRepo.ListAsync(new GetJobByNameSpecification(request.Name));

        response.Jobs = jobs.Select(job => new JobReadDto
        {
            Id = job.Id,
            EmployerId = job.EmployerId,
            Title = job.Title,
            Description = job.Description,
            Location = job.Location,
            EType = job.EType,
            SalaryRange = job.SalaryRange,
            PostedDate = job.PostedDate,
            ExpirationDate = job.ExpirationDate,
            IsRemote = job.IsRemote,
            Status = job.Status,
            ApplicantCount = job.ApplicantCount,
            CreatedAt = job.CreatedAt,
            UpdatedAt = job.UpdatedAt
        }).ToList();

        return Results.Ok(response);
    }
}


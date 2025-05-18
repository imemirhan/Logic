using ApplicationCore.Entities.JobAggregate;
using ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.JobEndpoints;

public class CreateJobEndpoint : IEndpoint<IResult, CreateJobRequest, IRepository<Job>>
{
    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapPost("api/jobs",
            async (CreateJobRequest request, IRepository<Job> jobRepo) =>
            {
                return await HandleAsync(request, jobRepo);
            })
        .WithName("CreateJob")
        .WithDescription("Creates a new job posting")
        .Produces<CreateJobResponse>(StatusCodes.Status201Created)
        .WithTags("Job Endpoints");
    }

    public async Task<IResult> HandleAsync(CreateJobRequest request, IRepository<Job> jobRepo)
    {
        var response = new CreateJobResponse(request.CorrelationId());

        var job = new Job(
            createdAt: DateTime.UtcNow,
            employerId: request.EmployerId,
            title: request.Title,
            description: request.Description,
            location: request.Location,
            employmentType: request.EType,
            salaryRange: request.SalaryRange,
            postedDate: DateTime.SpecifyKind(request.PostedDate, DateTimeKind.Utc),
            expirationDate: DateTime.SpecifyKind(request.ExpirationDate, DateTimeKind.Utc),
            isRemote: request.IsRemote
        );

        var createdJob = await jobRepo.AddAsync(job);

        response.Job = new JobReadDto
        {
            Id = createdJob.Id,
            Title = createdJob.Title,
            Description = createdJob.Description,
            Location = createdJob.Location,
            EType = createdJob.EType,
            SalaryRange = createdJob.SalaryRange,
            EmployerId = createdJob.EmployerId,
            PostedDate = createdJob.PostedDate,
            ExpirationDate = createdJob.ExpirationDate,
            IsRemote = createdJob.IsRemote,
            Status = createdJob.Status,
            ApplicantCount = createdJob.ApplicantCount,
            CreatedAt = createdJob.CreatedAt,
            UpdatedAt = createdJob.UpdatedAt
        };
        return Results.Created($"/api/jobs/{createdJob.Id}", response);
    }
}

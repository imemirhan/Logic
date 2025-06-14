﻿using ApplicationCore.Entities.JobAggregate;
using ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.JobEndpoints;

public class UpdateJobEndpoint : IEndpoint<IResult, UpdateJobRequest, IRepository<Job>, ITagGeneratorService>
{
    public UpdateJobEndpoint() { }

    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapPut("api/jobs",
            [Authorize(Roles = Shared.Authorization.Constants.Roles.EMPLOYER,
                AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
            async (UpdateJobRequest request, IRepository<Job> jobRepo, ITagGeneratorService tagGenerator) =>
            {
                return await HandleAsync(request, jobRepo, tagGenerator);
            })
        .WithName("UpdateJob")
        .WithDescription("Updates an existing job listing")
        .Produces<UpdateJobResponse>(StatusCodes.Status200OK)
        .WithTags("Job Endpoints");
    }

    public async Task<IResult> HandleAsync(UpdateJobRequest request, IRepository<Job> jobRepo, ITagGeneratorService tagGenerator)
    {
        var response = new UpdateJobResponse(request.CorrelationId());

        var existingJob = await jobRepo.GetByIdAsync(request.Id);
        if (existingJob == null)
        {
            return Results.NotFound($"Job with ID {request.Id} not found.");
        }

        existingJob.UpdateJobInfo(
            request.Title,
            request.Description,
            request.Location,
            request.EmploymentType,
            request.SalaryRange,
            request.ExpirationDate,
            request.IsRemote,
            request.Status
        );

        // Safely recompute tags based on updated job
        existingJob.Tags = tagGenerator.GenerateTagsForJob(existingJob);

        await jobRepo.UpdateAsync(existingJob);

        response.Job = new JobReadDto
        {
            Id = existingJob.Id,
            EmployerId = existingJob.EmployerId,
            Title = existingJob.Title,
            Description = existingJob.Description,
            Location = existingJob.Location,
            EType = existingJob.EType,
            SalaryRange = existingJob.SalaryRange,
            PostedDate = existingJob.PostedDate,
            ExpirationDate = existingJob.ExpirationDate,
            IsRemote = existingJob.IsRemote,
            Status = existingJob.Status,
            ApplicantCount = existingJob.ApplicantCount,
            CreatedAt = existingJob.CreatedAt,
            UpdatedAt = existingJob.UpdatedAt,
        };

        return Results.Ok(response);
    }
}

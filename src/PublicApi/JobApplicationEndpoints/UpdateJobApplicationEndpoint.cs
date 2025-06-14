﻿using ApplicationCore.Entities.JobAggregate;
using ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.JobApplicationEndpoints;

public class UpdateJobApplicationEndpoint
    : IEndpoint<IResult, UpdateJobApplicationRequest, IRepository<JobApplication>>
{
    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapPut("api/job-applications/{id:int}",
            [Authorize(Roles = Shared.Authorization.Constants.Roles.EMPLOYER, 
                AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
            async (int id, UpdateJobApplicationRequest request, IRepository<JobApplication> repo) =>
            {
                request.Id = id; // ensure route and body match
                return await HandleAsync(request, repo);
            })
        .WithName("UpdateJobApplication")
        .WithDescription("Updates a job application")
        .Produces<UpdateJobApplicationResponse>(StatusCodes.Status200OK)
        .WithTags("Job Application Endpoints");
    }

    public async Task<IResult> HandleAsync(UpdateJobApplicationRequest request, IRepository<JobApplication> repo)
    {
        var response = new UpdateJobApplicationResponse(request.CorrelationId());

        var jobApp = await repo.GetByIdAsync(request.Id);
        if (jobApp is null)
            return Results.NotFound($"Job application with id {request.Id} not found.");

        var dto = request.JobApplication;

        if (!string.IsNullOrWhiteSpace(dto.CoverLetter))
            jobApp.UpdateCoverLetter(dto.CoverLetter);

        if (dto.Status.HasValue)
            jobApp.UpdateStatus(dto.Status.Value);

        await repo.UpdateAsync(jobApp);

        response.JobApplication = new JobApplicationReadDto
        {
            Id = jobApp.Id,
            JobId = jobApp.JobId,
            JobSeekerId = jobApp.JobSeekerId,
            EmployerId = jobApp.EmployerId,
            CoverLetter = jobApp.CoverLetter,
            Status = jobApp.Status,
            CreatedAt = jobApp.CreatedAt,
            UpdatedAt = jobApp.UpdatedAt
        };

        return Results.Ok(response);
    }
}

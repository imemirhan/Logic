﻿using ApplicationCore.Entities.JobSeekerAggregate;
using ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.JobSeekerEndpoints
{
    public class DeleteJobSeekerEndpoint : IEndpoint<IResult, DeleteJobSeekerRequest, IRepository<JobSeeker>>
    {
        public void AddRoute(IEndpointRouteBuilder app)
        {
            app.MapDelete("api/jobseekers/{jobSeekerId}",
                    [Authorize(Roles = Shared.Authorization.Constants.Roles.ADMINISTRATORS, AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
                    async (int jobSeekerId, IRepository<JobSeeker> jobSeekerRepository) =>
                    {
                        return await HandleAsync(new DeleteJobSeekerRequest(jobSeekerId), jobSeekerRepository);
                    })
                .Produces<DeleteJobSeekerResponse>()
                .WithTags("JobSeeker Endpoints");
        }

        public async Task<IResult> HandleAsync(DeleteJobSeekerRequest request, IRepository<JobSeeker> itemRepository)
        {
            var response = new DeleteJobSeekerResponse(request.CorrelationId());

            var itemToDelete = await itemRepository.GetByIdAsync(request.JobSeekerId);
            if (itemToDelete is null)
                return Results.NotFound($"JobSeeker with ID {request.JobSeekerId} not found.");

            await itemRepository.DeleteAsync(itemToDelete);

            return Results.Ok(response);
        }
    }
}
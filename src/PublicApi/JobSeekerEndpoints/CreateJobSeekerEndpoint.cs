﻿using ApplicationCore.Entities.JobSeekerAggregate;
using ApplicationCore.Interfaces;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.JobSeekerEndpoints
{
    public class CreateJobSeekerEndpoint : IEndpoint<IResult, CreateJobSeekerRequest, IRepository<JobSeeker>, UserManager<ApplicationUser>>
    {
        public CreateJobSeekerEndpoint()
        {
        }

        public void AddRoute(IEndpointRouteBuilder app)
        {
            app.MapPost("api/jobseekers", 
                async (CreateJobSeekerRequest request, IRepository<JobSeeker> itemRepository, UserManager<ApplicationUser> employerManager) =>
                {
                    return await HandleAsync(request, itemRepository, employerManager);
                })
            .WithName("CreateJobSeeker")
            .WithDescription("Creates a new job seeker")
            .Produces<CreateJobSeekerResponse>(StatusCodes.Status201Created)
            .WithTags("JobSeeker Endpoints");
        }

        public async Task<IResult> HandleAsync(CreateJobSeekerRequest request, IRepository<JobSeeker> itemRepository, UserManager<ApplicationUser> employerManager)
        {
            var response = new CreateJobSeekerResponse(request.CorrelationId());

            var appUser = new ApplicationUser
            {
                Id = request.CorrelationId().ToString(),
                UserName = request.Email,
                Name = request.Name,
                Surname = request.LastName,
                Email = request.Email,
                PhoneNumber = request.Phone,
                RefreshTokenHash = Guid.NewGuid().ToString(),
                RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7)
            };

            var result = await employerManager.CreateAsync(appUser, request.Password);

            var newJobSeeker = new JobSeeker
            (
                DateTime.UtcNow,
                request.CorrelationId().ToString(),
                request.Name,
                request.LastName
            );

            if (!result.Succeeded)
            {
                var errorMessages = string.Join("; ", result.Errors.Select(e => e.Description));
                Console.WriteLine("Error occurred: " + errorMessages);
                return Results.BadRequest(new { Errors = errorMessages });
            }

            newJobSeeker = await itemRepository.AddAsync(newJobSeeker);

            await employerManager.AddToRoleAsync(appUser, "JobSeeker");
            
            var dto = new JobSeekerReadDto
            {
                Id = newJobSeeker.Id,
                IdentityGuid = newJobSeeker.IdentityGuid,
                Name = newJobSeeker.Name,
                LastName = newJobSeeker.LastName,
                ResumeUrl = newJobSeeker.ResumeUrl,
                AboutMe = newJobSeeker.AboutMe,
                LinkedIn = newJobSeeker.LinkedIn,
                ProfileImageUrl = newJobSeeker.ProfileImageUrl,
                GitHub = newJobSeeker.GitHub,
                Twitter = newJobSeeker.Twitter,
                Facebook = newJobSeeker.Facebook,
                Instagram = newJobSeeker.Instagram,
                CreatedAt = newJobSeeker.CreatedAt,
                UpdatedAt = newJobSeeker.UpdatedAt
            };

            response.JobSeeker = dto;
            return Results.Ok(response);
        }
    }
}

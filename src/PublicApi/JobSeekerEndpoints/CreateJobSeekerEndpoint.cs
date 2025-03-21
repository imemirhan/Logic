using ApplicationCore.Entities.JobSeekerAggregate;
using ApplicationCore.Interfaces;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.JobSeekerEndpoints
{
    public class CreateJobSeekerEndpoint : IEndpoint<IResult, CreateJobSeekerRequest, IRepository<JobSeeker>, UserManager<ApplicationUser>>
    {
        public CreateJobSeekerEndpoint() { }

        public void AddRoute(IEndpointRouteBuilder app)
        {
            app.MapPost("api/jobseekers", 
                [Authorize(Roles = Shared.Authorization.Constants.Roles.ADMINISTRATORS, AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
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
                Email = request.Email,
                PhoneNumber = request.Phone
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
                return Results.BadRequest(result.Errors);
            }

            newJobSeeker = await itemRepository.AddAsync(newJobSeeker);

            var dto = new JobSeekerReadDto
            {
                Id = newJobSeeker.Id,
                IdentityGuid = newJobSeeker.IdentityGuid,
                Name = newJobSeeker.Name,
                LastName = newJobSeeker.LastName,
                ResumeUrl = newJobSeeker.ResumeUrl,
                AboutMe = newJobSeeker.AboutMe,
                ProfileImageUrl = newJobSeeker.ProfileImageUrl,
                LinkedIn = newJobSeeker.LinkedIn,
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

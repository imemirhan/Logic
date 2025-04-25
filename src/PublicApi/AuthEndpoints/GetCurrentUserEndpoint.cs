using ApplicationCore.Interfaces;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using MinimalApi.Endpoint;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using IResult = Ardalis.Result.IResult;

namespace PublicApi.AuthEndpoints
{
    public class GetCurrentUserEndpoint : IEndpoint<IResult, GetCurrentUserRequest, IEmployerService, IJobSeekerService, UserManager<ApplicationUser>>
    {
        public void AddRoute(IEndpointRouteBuilder app)
        {
            app.MapGet("api/user/profile", 
                async (IEmployerService employerService, IJobSeekerService jobSeekerService, UserManager<ApplicationUser> userManager) =>
                {
                    return await HandleAsync(employerService, jobSeekerService, userManager);
                })
                .WithName("GetCurrentUser")
                .WithDescription("Fetches the current user's profile")
                .Produces<CurrentUserResponse>(StatusCodes.Status200OK)
                .Produces(StatusCodes.Status404NotFound)
                .Produces(StatusCodes.Status401Unauthorized)
                .WithTags("AuthEndpoints");
        }

        public async Task<IResult> HandleAsync(
            IEmployerService employerService,
            IJobSeekerService jobSeekerService,
            UserManager<ApplicationUser> userManager)
        {
            var userName = userManager.GetUserName(); // Assuming user is authenticated and userName is accessible
            if (string.IsNullOrEmpty(userName))
            {
                return Results.Unauthorized(new { error = "User not authenticated" });
            }

            var user = await userManager.FindByNameAsync(userName);
            if (user == null)
            {
                return Results.NotFound(new { error = "User not found" });
            }

            var userRoles = await userManager.GetRolesAsync(user);
            var identityGuid = user.Id; // Assuming IdentityGuid is available and valid

            if (identityGuid == null)
            {
                return Results.BadRequest(new { error = "IdentityGuid is missing" });
            }

            // Initialize the response DTO
            var responseDto = new GetCurrentUserResponseDto
            {
                Name = user.UserName,
                Email = user.Email,
                Phone = user.PhoneNumber,
                Bio = user.Bio // assuming user has a bio field
            };

            // Check if the user is an Employer
            if (userRoles.Contains("Employer"))
            {
                var employer = await employerService.GetEmployerByIdentityGuid(identityGuid);
                if (employer != null)
                {
                    responseDto.CompanyName = employer.CompanyName;
                    responseDto.Description = employer.Description;
                    responseDto.Industry = employer.Industry;
                    responseDto.Role = "Employer";
                }
                else
                {
                    return Results.NotFound(new { error = "Employer profile not found" });
                }
            }
            // Check if the user is a JobSeeker
            else if (userRoles.Contains("JobSeeker"))
            {
                var jobSeeker = await jobSeekerService.GetJobSeekerByIdentityGuid(identityGuid);
                if (jobSeeker != null)
                {
                    responseDto.ResumeLink = jobSeeker.ResumeLink;
                    responseDto.Role = "JobSeeker";
                }
                else
                {
                    return Results.NotFound(new { error = "JobSeeker profile not found" });
                }
            }
            else
            {
                return Results.Unauthorized(new { error = "User role not recognized" });
            }

            return Results.Ok(responseDto);
        }
    }
}

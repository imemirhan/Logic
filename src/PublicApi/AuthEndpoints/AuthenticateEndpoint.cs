using System.Threading;
using System.Threading.Tasks;
using ApplicationCore.Enums;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ApplicationCore.Interfaces;
using Infrastructure.Data;
using Infrastructure.Identity;
using Microsoft.EntityFrameworkCore;
using Npgsql.Replication;
using Swashbuckle.AspNetCore.Annotations;

namespace PublicApi.AuthEndpoints;

/// <summary>
/// Authenticates a user
/// </summary>
public class AuthenticateEndpoint : EndpointBaseAsync
    .WithRequest<AuthenticateRequest>
    .WithActionResult<AuthenticateResponse>
{
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly ITokenClaimsService _tokenClaimsService;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IEmployerService _employerService;
    private readonly IJobSeekerService _jobSeekerService;
    private readonly AppDbContext _dbContext;

    public AuthenticateEndpoint(
        SignInManager<ApplicationUser> signInManager,
        ITokenClaimsService tokenClaimsService,
        UserManager<ApplicationUser> userManager,
        IEmployerService employerService,
        IJobSeekerService jobSeekerService,
        AppDbContext dbContext)
    {
        _signInManager = signInManager;
        _tokenClaimsService = tokenClaimsService;
        _userManager = userManager;
        _employerService = employerService;
        _jobSeekerService = jobSeekerService;
        _dbContext = dbContext;
    }

    [HttpPost("api/authenticate")]
    [SwaggerOperation(
        Summary = "Authenticates a user",
        Description = "Authenticates a user",
        OperationId = "auth.authenticate",
        Tags = new[] { "AuthEndpoints" })
    ]
    public override async Task<ActionResult<AuthenticateResponse>> HandleAsync(AuthenticateRequest request,
        CancellationToken cancellationToken = default)
    {
        var result = await _signInManager.PasswordSignInAsync(request.Username, request.Password, false, true);

        var response = new AuthenticateResponse(request.CorrelationId())
        {
            Result = result.Succeeded,
            IsLockedOut = result.IsLockedOut,
            IsNotAllowed = result.IsNotAllowed,
            RequiresTwoFactor = result.RequiresTwoFactor,
            Username = request.Username,
        };

        if (!result.Succeeded) return response;

        var user = await _userManager.FindByNameAsync(request.Username);
        if (user == null) return response;

        response.Email = user.Email;
        response.Token = await _tokenClaimsService.GetTokenAsync(request.Username);

        var roles = await _userManager.GetRolesAsync(user);
        var identityGuid = user.Id;

        if (await _userManager.IsInRoleAsync(user, "Employer"))
        {
            var employer = await _employerService.GetEmployerByIdentityGuidAsync(identityGuid);
            if (employer.Value != null)
            {
                response.FullName = $"{employer.Value.Name} {employer.Value.Surname}";
                response.Role = ProjectEnums.Role.Employer;
                response.Employer = employer;
            }
        }
        else if (await _userManager.IsInRoleAsync(user, "JobSeeker"))
        {
            var jobSeekerResult = await _jobSeekerService.GetJobSeekerByIdentityGuidAsync(identityGuid);
            if (jobSeekerResult.Value != null)
            {
                var jobSeeker = jobSeekerResult.Value;

                var skills = await _dbContext.Skills
                    .Where(sk => sk.JobSeekerId == jobSeeker.Id)
                    .ToListAsync();

                foreach (var skill in skills)
                {
                    jobSeeker.AddSkill(skill);
                }

                var experiences = await _dbContext.Experiences
                    .Where(ex => ex.JobSeekerId == jobSeeker.Id)
                    .ToListAsync();

                foreach (var experience in experiences)
                {
                    jobSeeker.AddExperience(experience);
                }

                var educations = await _dbContext.Educations
                    .Where(ed => ed.JobSeekerId == jobSeeker.Id)
                    .ToListAsync();

                foreach (var education in educations)
                {
                    jobSeeker.AddEducation(education);
                }

                response.FullName = $"{jobSeeker.Name} {jobSeeker.LastName}";
                response.Role = ProjectEnums.Role.JobSeeker;
                response.JobSeeker = jobSeeker;
            }
        }

        return response;
    }
}

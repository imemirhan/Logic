using ApplicationCore.Entities.JobSeekerAggregate;
using ApplicationCore.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.JobSeekerEndpoints.ExperienceEndpoint;

public class AddExperienceByIdEndpoint : IEndpoint<IResult, AddExperienceByIdRequest, IRepository<JobSeeker>>
{
    private readonly IMapper _mapper;

    public AddExperienceByIdEndpoint(IMapper mapper)
    {
        _mapper = mapper;
    }
    
    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapPost("api/experiences", 
            [Authorize(Roles = Shared.Authorization.Constants.Roles.ADMINISTRATORS, AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
            async (AddExperienceByIdRequest request, IRepository<JobSeeker> jobSeekerRepository) =>
            {
                return await HandleAsync(request, jobSeekerRepository);
            })
        .WithName("AddExperienceToJobSeeker")
        .WithDescription("Adds an experience record to a job seeker")
        .Produces<AddExperienceByIdResponse>(StatusCodes.Status201Created)
        .WithTags("Experience Endpoints");
    }

    public async Task<IResult> HandleAsync(AddExperienceByIdRequest request, IRepository<JobSeeker> jobSeekerRepository)
    {
        var jobSeeker = await jobSeekerRepository.GetByIdAsync(request.JobSeekerId);

        if (jobSeeker == null)
            return Results.NotFound($"JobSeeker with ID {request.JobSeekerId} not found");

        // Create a new Experience entry
        var newExperience = new Experience(request.JobSeekerId, request.Title, request.Company, request.Years);

        // Set the JobSeekerId using reflection
        newExperience.GetType().GetProperty(nameof(Experience.JobSeekerId))?.SetValue(newExperience, request.JobSeekerId);

        // Add the experience to the job seeker's list
        jobSeeker.AddExperience(newExperience);
        
        // Save changes
        await jobSeekerRepository.UpdateAsync(jobSeeker);

        return Results.Created($"/api/experiences/{request.JobSeekerId}/{newExperience.Id}", 
            new AddExperienceByIdResponse 
            { 
                Experience = new JobSeekerExperienceReadDto
                {
                    Id = newExperience.Id,
                    Title = newExperience.Title,
                    Company = newExperience.Company,
                    Years = newExperience.Years,
                    JobSeekerId = request.JobSeekerId
                }
            });
    }
}

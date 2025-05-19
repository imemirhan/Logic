using ApplicationCore.Entities.JobSeekerAggregate;
using ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.JobSeekerEndpoints.SkillsEndpoint;

public class AddSkillByIdEndpoint : IEndpoint<IResult, AddSkillByIdRequest, IRepository<JobSeeker>>
{
    public async Task<IResult> HandleAsync(AddSkillByIdRequest request, IRepository<JobSeeker> repository)
    {
        var jobSeeker = await repository.GetByIdAsync(request.JobSeekerId);

        if (jobSeeker == null)
            return Results.NotFound($"JobSeeker with ID {request.JobSeekerId} not found");

        var skill = new Skill(request.Title, request.Description, request.SkillType, request.JobSeekerId);

        jobSeeker.AddSkill(skill);

        await repository.UpdateAsync(jobSeeker);
        await repository.SaveChangesAsync();

        return Results.Created($"/api/skills/{request.JobSeekerId}/{skill.Id}", 
            new AddSkillByIdResponse 
            { 
                Skill = new JobSeekerSkillReadDto
                {
                    Id = skill.Id,
                    Title = skill.Title,
                    Description = skill.Description,
                    SkillType = skill.SkillType,
                    JobSeekerId = request.JobSeekerId
                }
            });
    }

    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapPost("api/skills",
                [Authorize(Roles = Shared.Authorization.Constants.Roles.JOBSEEKER, 
                    AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
                async (AddSkillByIdRequest request, IRepository<JobSeeker> skillRepository) =>
                {
                    return await HandleAsync(request, skillRepository);
                })
            .Accepts<AddSkillByIdRequest>("application/json")
            .Produces<AddSkillByIdResponse>(StatusCodes.Status201Created)
            .WithTags("Skill Endpoints");
    }
}
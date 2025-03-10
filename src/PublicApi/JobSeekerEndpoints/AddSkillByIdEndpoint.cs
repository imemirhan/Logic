using ApplicationCore.Entities.JobSeekerAggregate;
using ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.JobSeekerEndpoints
{
    public class AddSkillToJobSeekerEndpoint : IEndpoint<IResult, AddSkillByIdRequest, IRepository<Skill>>
    {
        public async Task<IResult> HandleAsync(AddSkillByIdRequest request, IRepository<Skill> repository)
        {
            var skill = new Skill(request.Title, request.Description, request.SkillType, request.JobSeekerId);

            // Save the skill to the repository (e.g., database)
            await repository.AddAsync(skill);

            return Results.Ok(new AddSkillByIdResponse());
        }

        public void AddRoute(IEndpointRouteBuilder app)
        {
            app.MapPost("api/jobseekers/{jobSeekerId}/skills",
                    async (AddSkillByIdRequest request, IRepository<Skill> skillRepository) =>
                    {
                        return await HandleAsync(request, skillRepository);
                    })
                .Accepts<AddSkillByIdRequest>("application/json")
                .Produces<AddSkillByIdResponse>()
                .WithTags("JobSeekerEndpoints");
        }
    }
}
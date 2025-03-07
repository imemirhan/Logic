using ApplicationCore.Entities.JobSeekerAggregate;
using ApplicationCore.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;

namespace PublicApi.JobSeekerEndpoints
{
    public class JobSeekerEndpoints : IEndpoint<IResult, IRepository<JobSeeker>>
    {
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;

        public JobSeekerEndpoints(IMapper mapper, UserManager<ApplicationUser> userManager)
        {
            _mapper = mapper;
            _userManager = userManager;
        }

        public void AddRoute(IEndpointRouteBuilder app)
        {
            app.MapGet("api/jobseekers", GetAllJobSeekers)
                .WithName("GetAllJobSeekers")
                .WithDescription("Get all job seekers")
                .Produces<List<JobSeekerReadDto>>()
                .WithTags("JobSeekerEndpoints");

            app.MapGet("api/jobseekers/{id}", GetJobSeekerById)
                .WithName("GetJobSeekerById")
                .WithDescription("Get job seeker by id")
                .Produces<JobSeekerReadDto>()
                .WithTags("JobSeekerEndpoints");

            app.MapPost("api/jobseekers", CreateJobSeeker)
                .WithName("CreateJobSeeker")
                .WithDescription("Create job seeker")
                .Accepts<JobSeekerCreateDto>("application/json")
                .Produces<JobSeekerReadDto>(StatusCodes.Status201Created)
                .WithTags("JobSeekerEndpoints");

            app.MapPut("api/jobseekers/{id}", UpdateJobSeeker)
                .WithName("UpdateJobSeeker")
                .WithDescription("Update job seeker")
                .Accepts<JobSeekerUpdateDto>("application/json")
                .Produces(StatusCodes.Status204NoContent)
                .WithTags("JobSeekerEndpoints");

            app.MapDelete("api/jobseekers/{id}", DeleteJobSeeker)
                .WithName("DeleteJobSeeker")
                .WithDescription("Delete job seeker")
                .Produces(StatusCodes.Status204NoContent)
                .WithTags("JobSeekerEndpoints");
            
            //Skill Endpoints
            app.MapPost("api/jobseekers/{id}/skills", AddSkill)
                .WithName("AddSkill")
                .WithDescription("Add skill to job seeker")
                .Accepts<JobSeekerSkillCreateDto>("application/json")
                .Produces(StatusCodes.Status201Created)
                .WithTags("JobSeekerEndpoints");
            
            app.MapDelete("api/jobseekers/{id}/skills/{skillId}", RemoveSkill)
                .WithName("RemoveSkill")
                .WithDescription("Remove skill from job seeker")
                .Produces(StatusCodes.Status204NoContent)
                .WithTags("JobSeekerEndpoints");

            //Education Endpoints
            app.MapPost("api/jobseekers/{id}/educations", AddEducation)
                .WithName("AddEducation")
                .WithDescription("Add education to job seeker")
                .Accepts<JobSeekerEducationCreateDto>("application/json")
                .Produces(StatusCodes.Status201Created)
                .WithTags("JobSeekerEndpoints");

            app.MapDelete("api/jobseekers/{id}/educations/{educationId}", RemoveEducation)
                .WithName("RemoveEducation")
                .WithDescription("Remove education from job seeker")
                .Produces(StatusCodes.Status204NoContent)
                .WithTags("JobSeekerEndpoints");

            //Experience Endpoints
            app.MapPost("api/jobseekers/{id}/experiences", AddExperience)
                .WithName("AddExperience")
                .WithDescription("Add experience to job seeker")
                .Accepts<JobSeekerExperienceCreateDto>("application/json")
                .Produces(StatusCodes.Status201Created)
                .WithTags("JobSeekerEndpoints");

            app.MapDelete("api/jobseekers/{id}/experiences/{experienceId}", RemoveExperience)
                .WithName("RemoveExperience")
                .WithDescription("Remove experience from job seeker")
                .Produces(StatusCodes.Status204NoContent)
                .WithTags("JobSeekerEndpoints");
        }

        public async Task<IResult> HandleAsync(IRepository<JobSeeker> jobSeekerRepository)
        {
            return await GetAllJobSeekers(jobSeekerRepository);
        }

        private async Task<IResult> CreateJobSeeker(JobSeekerCreateDto jobSeekerDto, IRepository<JobSeeker> jobSeekerRepository)
        {
            var user = new ApplicationUser
            {
                UserName = jobSeekerDto.Email,
                Email = jobSeekerDto.Email,
                PhoneNumber = jobSeekerDto.Phone,
            };
            var identityResult = await _userManager.CreateAsync(user, jobSeekerDto.Password);
            if (!identityResult.Succeeded)
            {
                return Results.BadRequest(identityResult.Errors);
            }
            var jobSeeker = _mapper.Map<JobSeeker>(jobSeekerDto);
            jobSeeker.CreatedAt = DateTime.UtcNow;
            jobSeeker.IdentityGuid = user.Id;
            
            await jobSeekerRepository.AddAsync(jobSeeker);
            return Results.Created($"api/jobseekers/{jobSeeker.Id}", _mapper.Map<JobSeekerReadDto>(jobSeeker));
        }

        private async Task<IResult> GetAllJobSeekers(IRepository<JobSeeker> jobSeekerRepository)
        {
            var jobSeekers = await jobSeekerRepository.ListAsync();
            var jobSeekerDtos = _mapper.Map<List<JobSeekerReadDto>>(jobSeekers);
            return Results.Ok(jobSeekerDtos);
        }

        private async Task<IResult> GetJobSeekerById(int id, IRepository<JobSeeker> jobSeekerRepository)
        {
            var jobSeeker = await jobSeekerRepository.GetByIdAsync(id);
            if (jobSeeker == null) return Results.NotFound();
            return Results.Ok(_mapper.Map<JobSeekerReadDto>(jobSeeker));
        }

        private async Task<IResult> UpdateJobSeeker(int id, JobSeekerUpdateDto jobSeekerDto, IRepository<JobSeeker> jobSeekerRepository)
        {
            var jobSeeker = await jobSeekerRepository.GetByIdAsync(id);
            if (jobSeeker == null) return Results.NotFound();
            
            _mapper.Map(jobSeekerDto, jobSeeker);
            await jobSeekerRepository.UpdateAsync(jobSeeker);
            return Results.NoContent();
        }

        private async Task<IResult> DeleteJobSeeker(int id, IRepository<JobSeeker> jobSeekerRepository)
        {
            var jobSeeker = await jobSeekerRepository.GetByIdAsync(id);
            if (jobSeeker == null) return Results.NotFound();
            
            await jobSeekerRepository.DeleteAsync(jobSeeker);
            return Results.NoContent();
        }

        private async Task<IResult> AddSkill(int id, JobSeekerSkillCreateDto skillDto, IRepository<JobSeeker> jobSeekerRepository)
        {
            var jobSeeker = await jobSeekerRepository.GetByIdAsync(id);
            if (jobSeeker == null) return Results.NotFound();
            var skills = _mapper.Map<Skill>(skillDto);
            jobSeeker.AddSkill(skills);
            await jobSeekerRepository.UpdateAsync(jobSeeker);
            return Results.Created();
        }

        private async Task<IResult> RemoveSkill(int id, int skillId, IRepository<JobSeeker> jobSeekerRepository)
        {
            var jobSeeker = await jobSeekerRepository.GetByIdAsync(id);
            if (jobSeeker == null) return Results.NotFound();
            jobSeeker.RemoveSkill(skillId);
            await jobSeekerRepository.UpdateAsync(jobSeeker);
            return Results.NoContent();
        }

        private async Task<IResult> AddEducation(int id, JobSeekerEducationCreateDto educationDto,
            IRepository<JobSeeker> jobSeekerRepository)
        {
            var jobSeeker = await jobSeekerRepository.GetByIdAsync(id);
            if (jobSeeker == null) return Results.NotFound();
            
            var educations = _mapper.Map<Education>(educationDto);
            jobSeeker.AddEducation(educations);
            await jobSeekerRepository.UpdateAsync(jobSeeker);
            return Results.NoContent();
        }

        private async Task<IResult> RemoveEducation(int id, int educationId, IRepository<JobSeeker> jobSeekerRepository)
        {
            var jobSeeker = await jobSeekerRepository.GetByIdAsync(id);
            if (jobSeeker == null) return Results.NotFound();
            
            jobSeeker.RemoveEducation(educationId);
            await jobSeekerRepository.UpdateAsync(jobSeeker);
            return Results.NoContent();
        }

        private async Task<IResult> AddExperience(int id, JobSeekerExperienceCreateDto experienceCreateDto, IRepository<JobSeeker> jobSeekerRepository)
        {
            var jobSeeker = await jobSeekerRepository.GetByIdAsync(id);
            if (jobSeeker == null) return Results.NotFound();
            var experiences = _mapper.Map<Experience>(experienceCreateDto);
            jobSeeker.AddExperience(experiences);
            await jobSeekerRepository.UpdateAsync(jobSeeker);
            return Results.NoContent();
        }

        private async Task<IResult> RemoveExperience(int id, int experienceId, IRepository<JobSeeker> jobSeekerRepository)
        {
            var jobSeeker = await jobSeekerRepository.GetByIdAsync(id);
            if (jobSeeker == null) return Results.NotFound();
            jobSeeker.RemoveExperience(experienceId);
            await jobSeekerRepository.UpdateAsync(jobSeeker);
            return Results.NoContent();
        }
    }
}
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

namespace PublicApi.JobSeekerEndpoints
{
    public class JobSeekerEndpoints : IEndpoint<IResult, IRepository<JobSeeker>>
    {
        private readonly IMapper _mapper;

        public JobSeekerEndpoints(IMapper mapper)
        {
            _mapper = mapper;
        }

        public void AddRoute(IEndpointRouteBuilder app)
        {
            app.MapGet("api/jobseekers", GetJobSeekers)
                .Produces<List<JobSeekerReadDto>>()
                .WithTags("JobSeekerEndpoints");

            app.MapGet("api/jobseekers/{id}", GetJobSeekerById)
                .Produces<JobSeekerReadDto>()
                .WithTags("JobSeekerEndpoints");

            app.MapPost("api/jobseekers", CreateJobSeeker)
                .Accepts<JobSeekerCreateDto>("application/json")
                .Produces<JobSeekerReadDto>(StatusCodes.Status201Created)
                .WithTags("JobSeekerEndpoints");

            app.MapPut("api/jobseekers/{id}", UpdateJobSeeker)
                .Accepts<JobSeekerUpdateDto>("application/json")
                .Produces(StatusCodes.Status204NoContent)
                .WithTags("JobSeekerEndpoints");

            app.MapDelete("api/jobseekers/{id}", DeleteJobSeeker)
                .Produces(StatusCodes.Status204NoContent)
                .WithTags("JobSeekerEndpoints");

            app.MapPost("api/jobseekers/{id}/skills", AddSkill)
                .Accepts<JobSeekerSkillDto>("application/json")
                .Produces(StatusCodes.Status201Created)
                .WithTags("JobSeekerEndpoints");
            
            app.MapDelete("api/jobseekers/{id}/skills/{skillId}", RemoveSkill)
                .Produces(StatusCodes.Status204NoContent)
                .WithTags("JobSeekerEndpoints");

            app.MapPost("api/jobseekers/{id}/educations", AddEducation)
                .Accepts<JobSeekerEducationDto>("application/json")
                .Produces(StatusCodes.Status201Created)
                .WithTags("JobSeekerEndpoints");

            app.MapDelete("api/jobseekers/{id}/educations/{educationId}", RemoveEducation)
                .Produces(StatusCodes.Status204NoContent)
                .WithTags("JobSeekerEndpoints");

            app.MapPost("api/jobseekers/{id}/experiences", AddExperience)
                .Accepts<JobSeekerExperienceDto>("application/json")
                .Produces(StatusCodes.Status201Created)
                .WithTags("JobSeekerEndpoints");

            app.MapDelete("api/jobseekers/{id}/experiences/{experienceId}", RemoveExperience)
                .Produces(StatusCodes.Status204NoContent)
                .WithTags("JobSeekerEndpoints");
        }

        public async Task<IResult> HandleAsync(IRepository<JobSeeker> jobSeekerRepository)
        {
            return await GetJobSeekers(jobSeekerRepository);
        }

        private async Task<IResult> GetJobSeekers(IRepository<JobSeeker> jobSeekerRepository)
        {
            var jobSeekers = await jobSeekerRepository.ListAsync();
            var jobSeekerDtos = jobSeekers.Select(_mapper.Map<JobSeekerReadDto>).ToList();
            return Results.Ok(jobSeekerDtos);
        }

        private async Task<IResult> GetJobSeekerById(int id, IRepository<JobSeeker> jobSeekerRepository)
        {
            var jobSeeker = await jobSeekerRepository.GetByIdAsync(id);
            if (jobSeeker == null) return Results.NotFound();
            return Results.Ok(_mapper.Map<JobSeekerReadDto>(jobSeeker));
        }

        private async Task<IResult> CreateJobSeeker(JobSeekerCreateDto jobSeekerDto, IRepository<JobSeeker> jobSeekerRepository)
        {
            var jobSeeker = _mapper.Map<JobSeeker>(jobSeekerDto);
            await jobSeekerRepository.AddAsync(jobSeeker);
            return Results.Created($"api/jobseekers/{jobSeeker.Id}", _mapper.Map<JobSeekerReadDto>(jobSeeker));
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

        private async Task<IResult> AddSkill(int id, JobSeekerSkillDto skillDto, IRepository<JobSeeker> jobSeekerRepository)
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

        private async Task<IResult> AddEducation(int id, JobSeekerEducationDto educationDto,
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

        private async Task<IResult> AddExperience(int id, JobSeekerExperienceDto experienceDto, IRepository<JobSeeker> jobSeekerRepository)
        {
            var jobSeeker = await jobSeekerRepository.GetByIdAsync(id);
            if (jobSeeker == null) return Results.NotFound();
            var experiences = _mapper.Map<Experience>(experienceDto);
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
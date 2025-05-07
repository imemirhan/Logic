using ApplicationCore.Entities.JobSeekerAggregate;
using ApplicationCore.Interfaces;
using AutoMapper;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using MinimalApi.Endpoint;
using PublicApi.EmployerEndpoints;

namespace PublicApi.JobSeekerEndpoints;

public class GetJobSeekerByIdEndpoint : IEndpoint<IResult, GetJobSeekerByIdRequest, IRepository<JobSeeker>>
{
    private readonly IMapper _mapper;
    private readonly AppDbContext _context;

    public GetJobSeekerByIdEndpoint(IMapper mapper, AppDbContext context)
    {
        _mapper = mapper;
        _context = context;
    }
    
    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapGet("api/jobseekers/{jobSeekerId}", 
                async (int jobSeekerId, IRepository<JobSeeker> jobSeekerRepository) =>
                {
                    return await HandleAsync(new GetJobSeekerByIdRequest { JobSeekerId = jobSeekerId }, jobSeekerRepository);
                })
            .Produces<GetJobSeekerByIdResponse>()
            .WithTags("JobSeeker Endpoints");
    }

    public async Task<IResult> HandleAsync(GetJobSeekerByIdRequest request, IRepository<JobSeeker> repository)
    {
        var jobSeeker = await repository
            .GetAll()
            .FirstOrDefaultAsync(js => js.Id == request.JobSeekerId);

        if (jobSeeker == null)
        {
            return Results.NotFound($"Job Seeker with ID {request.JobSeekerId} not found.");
        }

        // Manually add skills, experiences, and educations to the job seeker entity
        var skills = await _context.Skills
            .Where(sk => sk.JobSeekerId == request.JobSeekerId)
            .ToListAsync();

        foreach (var skill in skills)
        {
            jobSeeker.AddSkill(skill);
        }

        var experiences = await _context.Experiences
            .Where(ex => ex.JobSeekerId == request.JobSeekerId)
            .ToListAsync();

        foreach (var experience in experiences)
        {
            jobSeeker.AddExperience(experience);
        }

        var educations = await _context.Educations
            .Where(ed => ed.JobSeekerId == request.JobSeekerId)
            .ToListAsync();

        foreach (var education in educations)
        {
            jobSeeker.AddEducation(education);
        }

        var jobSeekerDto = _mapper.Map<JobSeekerReadDto>(jobSeeker);

        return Results.Ok(jobSeekerDto);
    }
}

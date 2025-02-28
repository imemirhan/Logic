
using ApplicationCore.Entities.EmployerAggregate;
using ApplicationCore.Entities.JobSeekerAggregate;
using AutoMapper;
using PublicApi.EmployerEndpoints;
using PublicApi.JobSeekerEndpoints;

namespace PublicApi;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Employer, EmployerReadDto>();
        CreateMap<EmployerCreateDto, Employer>();
        CreateMap<EmployerUpdateDto, Employer>(); 
        CreateMap<JobSeeker, JobSeekerReadDto>();
        CreateMap<JobSeeker, JobSeekerCreateDto>();
        CreateMap<JobSeekerUpdateDto, JobSeeker>();
        CreateMap<Skill, JobSeekerSkillDto>();
        CreateMap<Education, JobSeekerEducationDto>();
        CreateMap<Experience, JobSeekerExperienceDto>();
    }
}

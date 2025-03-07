
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
        CreateMap<JobSeekerCreateDto, JobSeeker>();
        CreateMap<JobSeekerUpdateDto, JobSeeker>();
        CreateMap<JobSeekerSkillReadDto, Skill>();
        CreateMap<JobSeekerSkillCreateDto, Skill>();
        CreateMap<JobSeekerEducationReadDto, Education>();
        CreateMap<JobSeekerEducationCreateDto, Education>();
        CreateMap<JobSeekerExperienceReadDto, Experience>();
        CreateMap<JobSeekerExperienceCreateDto, Experience>();
    }
}

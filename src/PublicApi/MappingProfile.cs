
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
        
        CreateMap<JobSeeker, JobSeekerReadDto>()
            .ForMember(dest => dest.Skills, opt => opt.MapFrom(src => src.Skills.ToList()))
            .ForMember(dest => dest.Experiences, opt => opt.MapFrom(src => src.Experiences.ToList()))
            .ForMember(dest => dest.Educations, opt => opt.MapFrom(src => src.Educations.ToList()));

        CreateMap<JobSeekerCreateDto, JobSeeker>();
        CreateMap<JobSeekerUpdateDto, JobSeeker>();

        CreateMap<Skill, JobSeekerSkillReadDto>();
        CreateMap<JobSeekerSkillCreateDto, Skill>();

        CreateMap<Education, JobSeekerEducationReadDto>();
        CreateMap<JobSeekerEducationCreateDto, Education>();

        CreateMap<Experience, JobSeekerExperienceReadDto>();
        CreateMap<JobSeekerExperienceCreateDto, Experience>();
    }
}

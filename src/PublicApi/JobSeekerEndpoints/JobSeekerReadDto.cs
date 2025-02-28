using ApplicationCore.Entities.JobSeekerAggregate;

namespace PublicApi.JobSeekerEndpoints;

public class JobSeekerReadDto
{
    public int Id { get; set; }
    public string IdentityGuid { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string? ResumeUrl { get; set; } = string.Empty;
    public string? AboutMe { get; set; } = string.Empty;
    public string? ProfileImageUrl { get; set; }
    public string? LinkedIn { get; set; }
    public string? GitHub { get; set; }
    public string? Twitter { get; set; }
    public string? Facebook { get; set; }
    public string? Instagram { get; set; }
    public List<JobSeekerSkillDto> Skills { get; set; } = new();
    public List<JobSeekerEducationDto> Educations { get; set; } = new();
    public List<JobSeekerExperienceDto> Experiences { get; set; } = new();
}
using ApplicationCore.Entities.JobSeekerAggregate;
using ApplicationCore.Enums;

namespace PublicApi.JobSeekerEndpoints;

public class JobSeekerReadDto
{
    public int Id { get; set; }
    public string IdentityGuid { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string? ResumeUrl { get; set; } = string.Empty;
    public string? AboutMe { get; set; } = string.Empty;
    public string ? ProfileImageUrl { get; set; } = string.Empty;
    public string? LinkedIn { get; set; }
    public string? GitHub { get; set; }
    public string? Twitter { get; set; }
    public string? Facebook { get; set; }
    public string? Instagram { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public List<JobSeekerSkillReadDto> Skills { get; set; }
    public List<JobSeekerEducationReadDto> Educations { get; set; }
    public List<JobSeekerExperienceReadDto> Experiences { get; set; }
}
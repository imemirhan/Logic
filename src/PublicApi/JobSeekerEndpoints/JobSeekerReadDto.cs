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
    public string? ProfileImageUrl { get; set; } = string.Empty;
    public string? PreferredLocation { get; set; } = string.Empty;
    public bool OpenToRemote { get; set; } = false;
    public string? LinkedIn { get; set; }
    public string? GitHub { get; set; }
    public string? Twitter { get; set; }
    public string? Facebook { get; set; }
    public string? Instagram { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public List<Skill> Skills { get; set; }
    public List<Education> Educations { get; set; }
    public List<Experience> Experiences { get; set; }
}
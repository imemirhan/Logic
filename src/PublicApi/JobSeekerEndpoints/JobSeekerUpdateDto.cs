namespace PublicApi.JobSeekerEndpoints;

public class JobSeekerUpdateDto
{
    public string? Name { get; set; }
    public string? LastName { get; set; }
    public string? ResumeUrl { get; set; }
    public string? AboutMe { get; set; }
    public string? ProfileImageUrl { get; set; }
    public string? LinkedIn { get; set; }
    public string? GitHub { get; set; }
    public string? Twitter { get; set; }
    public string? Facebook { get; set; }
    public string? Instagram { get; set; }
    public DateTime? UpdatedAt { get; set; } = DateTime.Now;
    public List<JobSeekerSkillReadDto>? Skills { get; set; }
    public List<JobSeekerEducationReadDto>? Educations { get; set; }
    public List<JobSeekerExperienceReadDto>? Experiences { get; set; }
}
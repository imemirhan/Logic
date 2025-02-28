namespace PublicApi.JobSeekerEndpoints;

public class JobSeekerSkillDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public SkillType SkillType { get; set; }
    public int JobSeekerId { get; set; }
    
}
public enum SkillType
{
    Intermediate,
    Average,
    Beginner
}

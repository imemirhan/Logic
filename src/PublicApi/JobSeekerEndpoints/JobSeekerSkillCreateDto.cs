namespace PublicApi.JobSeekerEndpoints;
using ApplicationCore.Entities.JobSeekerAggregate;

public class JobSeekerSkillCreateDto
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public SkillType SkillType { get; set; }
}
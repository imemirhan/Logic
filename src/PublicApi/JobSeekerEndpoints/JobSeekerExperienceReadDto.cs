namespace PublicApi.JobSeekerEndpoints;

public class JobSeekerExperienceReadDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;
    public int Years { get; set; }
    public int JobSeekerId { get; set; }
}
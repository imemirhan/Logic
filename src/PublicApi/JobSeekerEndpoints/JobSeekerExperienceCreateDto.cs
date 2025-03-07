namespace PublicApi.JobSeekerEndpoints;

public class JobSeekerExperienceCreateDto
{
    public string Title { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;
    public int Years { get; set; }
}
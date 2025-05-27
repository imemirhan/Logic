namespace PublicApi.JobSeekerEndpoints;

public class JobSeekerExperienceReadDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public bool StillWorking { get; set; }
    public int JobSeekerId { get; set; }
}
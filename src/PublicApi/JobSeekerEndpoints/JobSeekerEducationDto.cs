namespace PublicApi.JobSeekerEndpoints;

public class JobSeekerEducationDto
{
    public int Id { get; set; }
    public string Degree { get; set; } = string.Empty;
    public string Institution { get; set; } = string.Empty;
    public int StartYear { get; set; }
    public int GraduationYear { get; set; }
    public int JobSeekerId { get; set; }
}
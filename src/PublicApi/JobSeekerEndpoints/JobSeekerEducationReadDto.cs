namespace PublicApi.JobSeekerEndpoints;

public class JobSeekerEducationReadDto
{
    public int Id { get; set; }
    public string Degree { get; set; } = string.Empty;
    public string Institution { get; set; } = string.Empty;
    public DateTime StartDate { get; set; }
    public DateTime GraduationDate { get; set; }
    public int JobSeekerId { get; set; }
}
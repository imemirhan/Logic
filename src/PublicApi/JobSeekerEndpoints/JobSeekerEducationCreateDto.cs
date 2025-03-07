namespace PublicApi.JobSeekerEndpoints;

public class JobSeekerEducationCreateDto
{
    public string Degree { get; set; } = string.Empty;
    public string Institution { get; set; } = string.Empty;
    public int StartYear { get; set; }
    public int GraduationYear { get; set; }
}
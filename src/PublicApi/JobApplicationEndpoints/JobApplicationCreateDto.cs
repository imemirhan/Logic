namespace PublicApi.JobApplicationEndpoints;

public class JobApplicationCreateDto
{
    public int JobId { get; set; }
    public int EmployerId { get; set; }
    public int JobSeekerId { get; set; }
    public string CoverLetter { get; set; } = string.Empty;
}

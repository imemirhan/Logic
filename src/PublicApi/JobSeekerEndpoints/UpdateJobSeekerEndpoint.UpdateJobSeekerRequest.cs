namespace PublicApi.JobSeekerEndpoints;

public class UpdateJobSeekerRequest : BaseRequest
{
    public int JobSeekerId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string? ResumeUrl { get; set; }
    public string? AboutMe { get; set; } = string.Empty;
    public string? ProfileImageUrl { get; set; }
    public string? LinkedIn { get; set; }
    public string? GitHub { get; set; }
    public string? Twitter { get; set; }
    public string? Facebook { get; set; }
    public string? Instagram { get; set; }
}
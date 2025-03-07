namespace PublicApi.JobSeekerEndpoints;

public class JobSeekerCreateDto
{
    public string Name { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty; // Password included only for creation
    public string Phone { get; set; } = string.Empty;
    public string? ResumeUrl { get; set; }
    public string? AboutMe { get; set; }
    public string? ProfileImageUrl { get; set; }
    public string? LinkedIn { get; set; }
    public string? GitHub { get; set; }
    public string? Twitter { get; set; }
    public string? Facebook { get; set; }
    public string? Instagram { get; set; }
}
namespace PublicApi.AuthEndpoints;

public class CurrentUserResponse
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public string Bio { get; set; }
    public string Role { get; set; }
        
    // Employer-specific fields
    public string CompanyName { get; set; }

    // JobSeeker-specific fields
    public string ResumeLink { get; set; }
}
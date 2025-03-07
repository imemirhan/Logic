namespace PublicApi.EmployerEndpoints;

public class EmployerCreateDto
{
    public string Name { get; set; } = string.Empty;
    public string Surname { get; set; } = string.Empty;
    public string CompanyName { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Industry { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty; // Password included only for creation
    public string? ProfileImageUrl { get; set; }
    public string? LinkedIn { get; set; }
    public string? GitHub { get; set; }
    public string? Twitter { get; set; }
    public string? Facebook { get; set; }
    public string? Instagram { get; set; }
    public string? WebsiteUrl { get; set; }
}

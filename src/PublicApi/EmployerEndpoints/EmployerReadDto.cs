using ApplicationCore.Entities.JobAggregate;

namespace PublicApi.EmployerEndpoints;

public class EmployerReadDto
{
    public int Id { get; set; }
    public string IdentityGuid { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Surname { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    
    public string Industry { get; set; } = string.Empty;
    public string CompanyName { get; set; } = string.Empty;
    public string? ProfileImageUrl { get; set; }
    public string? LinkedIn { get; set; }
    public string? GitHub { get; set; }
    public string? Twitter { get; set; }
    public string? Facebook { get; set; }
    public string? Instagram { get; set; }
    public string? WebsiteUrl { get; set; }
    public ICollection<Job> JobPostings { get; private set; } = new List<Job>();
    public DateTime? CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}

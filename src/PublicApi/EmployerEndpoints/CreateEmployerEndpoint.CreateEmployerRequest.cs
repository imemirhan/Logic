using System.ComponentModel.DataAnnotations;
using ApplicationCore.Entities.JobAggregate;

namespace PublicApi.EmployerEndpoints;

public class CreateEmployerRequest : BaseRequest
{
    public string Name { get; private set; } = string.Empty;
    public string Surname { get; private set; } = string.Empty;
    public string CompanyName { get; private set; } = string.Empty;
    public string Description { get; private set; } = string.Empty;
    public string Industry { get; private set; } = string.Empty;
    public string? ProfileImageUrl { get; private set; }
    public string? LinkedIn { get; private set; }
    public string? GitHub { get; private set; }
    public string? Twitter { get; private set; }
    public string? Facebook { get; private set; }
    public string? Instagram { get; private set; }
    public string? WebsiteUrl { get; private set; }
    public ICollection<Job> JobPostings { get; private set; } = new List<Job>();
}
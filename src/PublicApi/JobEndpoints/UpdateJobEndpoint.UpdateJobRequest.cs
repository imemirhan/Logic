using ApplicationCore.Entities.JobAggregate;

namespace PublicApi.JobEndpoints;

public class UpdateJobRequest : BaseRequest
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public EmploymentType EmploymentType { get; set; }
    public long SalaryRange { get; set; }
    public DateTime ExpirationDate { get; set; }
    public bool IsRemote { get; set; }
    public string Status { get; set; } = string.Empty;
}

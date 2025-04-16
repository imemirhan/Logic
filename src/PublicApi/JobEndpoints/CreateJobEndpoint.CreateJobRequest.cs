using ApplicationCore.Entities.JobAggregate;

namespace PublicApi.JobEndpoints;

public class CreateJobRequest : BaseRequest
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public EmploymentType EType { get; set; }
    public decimal SalaryRange { get; set; }
    public int EmployerId { get; set; }
    public DateTime PostedDate { get; set; }
    public DateTime ExpirationDate { get; set; }
    public bool IsRemote { get; set; } = false;
}

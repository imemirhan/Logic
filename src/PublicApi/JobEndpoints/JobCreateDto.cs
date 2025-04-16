using ApplicationCore.Entities.JobAggregate;

namespace PublicApi.JobEndpoints;

public class JobCreateDto
{
    public int EmployerId { get; set; }
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public string Location { get; set; } = default!;
    public EmploymentType EType { get; set; }
    public decimal SalaryRange { get; set; }
    public DateTime PostedDate { get; set; }
    public DateTime ExpirationDate { get; set; }
    public bool IsRemote { get; set; } = false;
}

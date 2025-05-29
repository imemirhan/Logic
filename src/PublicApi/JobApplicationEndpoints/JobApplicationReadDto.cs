using ApplicationCore.Entities.EmployerAggregate;
using ApplicationCore.Entities.JobAggregate;
using ApplicationCore.Entities.JobSeekerAggregate;

namespace PublicApi.JobApplicationEndpoints;

public class JobApplicationReadDto
{
    public int Id { get; set; }
    public int JobId { get; set; }
    public int JobSeekerId { get; set; }
    public JobSeeker JobSeeker { get; set; }
    public int EmployerId { get; set; }
    public Employer Employer { get; set; }
    public string? CoverLetter { get; set; }
    public JobApplication.ApplicationStatus? Status { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}

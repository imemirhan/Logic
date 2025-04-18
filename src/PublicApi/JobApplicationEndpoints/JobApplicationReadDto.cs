using ApplicationCore.Entities.JobAggregate;

namespace PublicApi.JobApplicationEndpoints;

public class JobApplicationReadDto
{
    public int Id { get; set; }
    public int JobId { get; set; }
    public int JobSeekerId { get; set; }
    public int EmployerId { get; set; }
    public string? CoverLetter { get; set; }
    public JobApplication.ApplicationStatus? Status { get; set; }
    public DateTime? InterviewScheduledDate { get; set; }
    public string? InterviewNotes { get; set; }
    public string? EmployerFeedback { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}

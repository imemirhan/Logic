using ApplicationCore.Entities.JobAggregate;

namespace PublicApi.JobApplicationEndpoints;

public class JobApplicationUpdateDto
{
    public string? CoverLetter { get; set; }
    public JobApplication.ApplicationStatus? Status { get; set; }
    public DateTime? InterviewScheduledDate { get; set; }
    public string? InterviewNotes { get; set; }
    public string? EmployerFeedback { get; set; }
}

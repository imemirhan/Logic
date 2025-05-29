using ApplicationCore.Entities.JobAggregate;

namespace PublicApi.JobSeekerNotificationEndpoints;

public class JobSeekerNotificationCreateDto
{
    public int JobId { get; set; }
    public int JobSeekerId { get; set; }
    public int EmployerId { get; set; }

    public bool ForStatus { get; set; }
    public bool ForInterview { get; set; }

    public JobApplication.ApplicationStatus Status { get; set; }
    public long? InterviewId { get; set; }
}
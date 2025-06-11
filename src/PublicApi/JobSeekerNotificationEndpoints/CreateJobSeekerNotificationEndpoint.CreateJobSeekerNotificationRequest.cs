using ApplicationCore.Entities.JobAggregate;

namespace PublicApi.JobSeekerNotificationEndpoints;

public class CreateJobSeekerNotificationRequest : BaseRequest
{
    public int JobId { get; set; }
    public int JobSeekerId { get; set; }
    public int EmployerId { get; set; }

    public bool ForStatus { get; set; }
    public bool ForInterview { get; set; }

    public int? Status { get; set; }
    public int? InterviewId { get; set; }
}
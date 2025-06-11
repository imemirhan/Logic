using ApplicationCore.Entities.EmployerAggregate;
using ApplicationCore.Entities.InterviewAggregate;
using ApplicationCore.Entities.JobAggregate;

namespace PublicApi.JobSeekerNotificationEndpoints;

public class JobSeekerNotificationReadDto
{
    public int Id { get; set; }
    public int JobId { get; set; }
    public NotifJobDto Job { get; set; }
    public int JobSeekerId { get; set; }
    public int EmployerId { get; set; }
    public NotifEmpDto Employer { get; set; }

    public bool ForStatus { get; set; }
    public bool ForInterview { get; set; }
    public string Message { get; set; }
    public string? Status { get; set; }
    public long? InterviewId { get; set; }
    public InterviewDto? Interview { get; set; }
    public bool IsOpened { get; set; }

    public DateTime CreatedAt { get; set; }
}
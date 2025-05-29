using ApplicationCore.Entities.EmployerAggregate;
using ApplicationCore.Entities.InterviewAggregate;
using ApplicationCore.Entities.JobAggregate;
using ApplicationCore.Interfaces;
using Ardalis.GuardClauses;

namespace ApplicationCore.Entities.JobSeekerAggregate;

public class JobSeekerNotifications : BaseEntity, IAggregateRoot
{
    public int JobId { get; private set; }
    public Job Job { get; private set; }

    public int JobSeekerId { get; private set; }
    public JobSeeker JobSeeker { get; private set; }

    public int EmployerId { get; private set; }
    public Employer Employer { get; private set; }

    public bool ForStatus { get; private set; }
    public bool ForInterview { get; private set; }
    
    public JobApplication.ApplicationStatus? Status { get; private set; }
    public long? InterviewId { get; private set; }
    public Interviews? Interview { get; private set; }
    public bool IsOpened { get; private set; }
    public string Message { get; private set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    #pragma warning disable CS8618
    private JobSeekerNotifications() {}
    
    public JobSeekerNotifications(int jobId,
        int jobSeekerId,
        int employerId,
        long? interviewId = null, 
        JobApplication.ApplicationStatus? status = null,
        bool forStatus = false,
        bool forInterview = false)
    {
        Guard.Against.Zero(jobId, nameof(jobId));
        Guard.Against.Zero(jobSeekerId, nameof(jobSeekerId));
        Guard.Against.Zero(employerId, nameof(employerId));

        if (!forStatus && !forInterview)
            throw new ArgumentException("At least one of forStatus or forInterview must be true.");

        if (forStatus && status == null)
            throw new ArgumentException("Status must be provided when forStatus is true.");

        if (forInterview && interviewId == null)
            throw new ArgumentException("InterviewId must be provided when forInterview is true.");

        JobId = jobId;
        JobSeekerId = jobSeekerId;
        EmployerId = employerId;
        ForStatus = forStatus;
        ForInterview = forInterview;
        Status = status;
        InterviewId = interviewId;
        IsOpened = false;
        CreatedAt = DateTime.UtcNow;
        if (ForStatus)
        {
            Message = Status switch
            {
                JobApplication.ApplicationStatus.UnderReview => $"Your application for the job #{JobId} is under review.",
                JobApplication.ApplicationStatus.InterviewScheduled => $"Your application for the job #{JobId} has progressed to the interview stage.",
                JobApplication.ApplicationStatus.Offered => $"Congratulations! You have a job offer for job #{JobId}.",
                JobApplication.ApplicationStatus.Rejected => $"We regret to inform you that your application for job #{JobId} was not successful.",
                _ => $"Your application status for job #{JobId} has been updated."
            };
        }
        else if (ForInterview)
        {
            Message = $"You have an interview scheduled for job #{JobId}. Please check the interview details.";
        }
        else
        {
            Message = "You have a new notification.";
        }
    }

    public void MarkAsOpened()
    {
        IsOpened = true;
    }
}
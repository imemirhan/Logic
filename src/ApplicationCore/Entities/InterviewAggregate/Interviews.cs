using ApplicationCore.Entities.EmployerAggregate;
using ApplicationCore.Entities.JobAggregate;
using ApplicationCore.Entities.JobSeekerAggregate;
using ApplicationCore.Interfaces;
using Ardalis.GuardClauses;

namespace ApplicationCore.Entities.InterviewAggregate;

public class Interviews : BaseEntity, IAggregateRoot
{
    public int JobId { get; private set; }
    public Job Job { get; private set; }

    public int JobSeekerId { get; private set; }
    public JobSeeker JobSeeker { get; private set; }

    public int EmployerId { get; private set; }
    public Employer Employer { get; private set; }
    
    public string InterViewLink { get; private set; }
    public bool IsAccepted { get; private set; }
    public bool IsAttended { get; private set; }
    public bool IsCancelled { get; private set; }
    
    public DateTime InterviewScheduledDate { get; private set; }
    public string? InterviewNotes { get; private set; }
    public string? EmployerFeedback { get; private set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
    
    #pragma warning disable CS8618
    private Interviews() { }
    
    public Interviews(int jobId, int employerId,
                      int jobSeekerId,
                      string interViewLink,
                      DateTime interviewScheduledDate)
    {
        Guard.Against.Zero(jobId, nameof(jobId));
        Guard.Against.Zero(jobSeekerId, nameof(jobSeekerId));
        Guard.Against.Zero(employerId, nameof(employerId));
        Guard.Against.NullOrEmpty(interViewLink, nameof(interViewLink));
        Guard.Against.Null(interviewScheduledDate, nameof(interviewScheduledDate));

        JobId = jobId;
        JobSeekerId = jobSeekerId;
        EmployerId = employerId;
        InterViewLink = interViewLink;
        IsAccepted = false;
        IsAttended = false;
        IsCancelled = false;
        InterviewScheduledDate = interviewScheduledDate;
        CreatedAt = DateTime.UtcNow;
    }
    
    public void PostponeInterview(DateTime interviewDate, string? interviewLink = null)
    {
        Guard.Against.Null( interviewDate, nameof(interviewDate));
        InterViewLink = interviewLink ?? InterViewLink; 
        InterviewScheduledDate = interviewDate; 
    }

    public void UpdateLink(string interviewLink)
    {
        Guard.Against.NullOrEmpty(interviewLink, nameof(interviewLink));
        InterViewLink = interviewLink.Trim();
        UpdatedAt = DateTime.UtcNow;
    }

    public void SetAccepted(bool isAccepted)
    {
        IsAccepted = isAccepted;
        UpdatedAt = DateTime.UtcNow;
    }

    public void SetAttended(bool isAttended)
    {
        IsAttended = isAttended;
        UpdatedAt = DateTime.UtcNow;
    }

    public void SetNotes(string notes)
    {
        Guard.Against.NullOrEmpty(notes, nameof(notes));
        InterviewNotes = notes.Trim();
        UpdatedAt = DateTime.UtcNow;
    }

    public void SetFeedback(string feedback)
    {
        Guard.Against.NullOrEmpty(feedback, nameof(feedback));
        EmployerFeedback = feedback.Trim();
        UpdatedAt = DateTime.UtcNow;
    }

    public void CancelInterview()
    {
        IsCancelled = true;
        UpdatedAt = DateTime.UtcNow;
    }
}
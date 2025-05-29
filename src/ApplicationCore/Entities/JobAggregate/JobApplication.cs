using ApplicationCore.Entities.EmployerAggregate;
using ApplicationCore.Entities.JobSeekerAggregate;
using ApplicationCore.Interfaces;
using Ardalis.GuardClauses;

namespace ApplicationCore.Entities.JobAggregate;

public class JobApplication : BaseEntity, IAggregateRoot
{
    public int JobId { get; private set; }
    public Job Job { get; private set; }

    public int JobSeekerId { get; private set; }
    public JobSeeker JobSeeker { get; private set; }

    public int EmployerId { get; private set; }
    public Employer Employer { get; private set; }
    
    public string? CoverLetter { get; private set; }
    public ApplicationStatus Status { get; private set; } = ApplicationStatus.Submitted;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;

    #pragma warning disable CS8618
    private JobApplication() { }

    public JobApplication(int jobId, int employerId, int jobSeekerId, string coverLetter)
    {
        Guard.Against.Zero(jobId, nameof(jobId));
        Guard.Against.Zero(jobSeekerId, nameof(jobSeekerId));
        Guard.Against.Zero(employerId, nameof(employerId));
        Guard.Against.NullOrEmpty(coverLetter, nameof(coverLetter));

        JobId = jobId;
        JobSeekerId = jobSeekerId;
        CoverLetter = coverLetter;
        EmployerId = employerId;

        CreatedAt = DateTime.UtcNow;
    }

    public void UpdateStatus(ApplicationStatus newStatus)
    {
        if (!Enum.IsDefined(typeof(ApplicationStatus), newStatus))
        {
            throw new ArgumentException("Invalid application status.");
        }
        Status = newStatus;
        UpdatedAt = DateTime.UtcNow;
    }

    public void UpdateCoverLetter(string newCoverLetter)
    {
        Guard.Against.NullOrEmpty(newCoverLetter, nameof(newCoverLetter));
        CoverLetter = newCoverLetter;
        UpdatedAt = DateTime.UtcNow;
    }
    
    public enum ApplicationStatus
    {
        Submitted,
        UnderReview,
        InterviewScheduled,
        InterviewCompleted,
        Offered,
        Rejected,
        Withdrawn
    }
}

using ApplicationCore.Entities.EmployerAggregate;
using ApplicationCore.Interfaces;
using Ardalis.GuardClauses;
using Microsoft.VisualBasic;

namespace ApplicationCore.Entities.JobAggregate;

public class Job : BaseEntity, IAggregateRoot
{
    public string Title { get; private set; }
    public string Description { get; private set; }
    public string Location { get; private set; }
    public EmploymentType EType{ get; private set; }
    public decimal SalaryRange { get; private set; }
    public int EmployerId { get; private set; }
    public Employer? Employer { get; private set; }
    public DateTime PostedDate { get; private set; }
    public DateTime ExpirationDate { get; private set; }
    public bool IsRemote { get; private set; }
    public JobStatus Status { get; private set; }
    public int ApplicantCount { get; private set; } = 0;
    
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }

    public ICollection<JobApplication> Applications { get; private set; } = new List<JobApplication>();

    #pragma warning disable CS8618
    private Job() { }

    public Job(DateTime createdAt, int employerId, string title, string description, string location,
               EmploymentType employmentType, decimal salaryRange, DateTime postedDate,
               DateTime expirationDate, bool isRemote = false)
    {
        Guard.Against.Null(createdAt, nameof(createdAt));
        Guard.Against.NullOrEmpty(title, nameof(title));
        Guard.Against.NullOrEmpty(description, nameof(description));
        Guard.Against.NullOrEmpty(location, nameof(location));
        Guard.Against.NegativeOrZero(salaryRange, nameof(salaryRange));
        Guard.Against.Default(postedDate, nameof(postedDate));
        Guard.Against.Default(expirationDate, nameof(expirationDate));

        if (postedDate > DateTime.UtcNow)
        {
            throw new ArgumentException("Posted date cannot be in the future.");
        }

        if (expirationDate <= postedDate)
        {
            throw new ArgumentException("Expiration date must be after the posted date.");
        }
        
        CreatedAt = createdAt;
        EmployerId = employerId;
        Title = title;
        Description = description;
        Location = location;
        EType = employmentType;
        SalaryRange = salaryRange;
        PostedDate = postedDate;
        ExpirationDate = expirationDate;
        IsRemote = isRemote;
        Status = JobStatus.Open;
    }

    public void UpdateJobInfo(Job job)
    {
        Guard.Against.Null(job, nameof(job));
        
        Title = job.Title;
        Description = job.Description;
        Location = job.Location;
        EType = job.EType;
        SalaryRange = job.SalaryRange;
        PostedDate = job.PostedDate;
        ExpirationDate = job.ExpirationDate;
        IsRemote = job.IsRemote;
        Status = job.Status;
        ApplicantCount = job.ApplicantCount;
        CreatedAt = job.CreatedAt;
        UpdatedAt = DateTime.UtcNow;
    }
    
    public void ExtendExpirationDate(DateTime newExpirationDate)
    {
        Guard.Against.Default(newExpirationDate, nameof(newExpirationDate));
        if (newExpirationDate <= DateTime.UtcNow)
        {
            throw new ArgumentException("Expiration date must be in the future.");
        }
        if (newExpirationDate <= PostedDate)
        {
            throw new ArgumentException("Expiration date must be after the posted date.");
        }

        ExpirationDate = newExpirationDate;
        UpdatedAt = DateTime.UtcNow;
    }

    public void IncrementApplicantCount() => ApplicantCount++;

    public void CloseJob() => Status = JobStatus.Closed;

    public void ReopenJob()
    {
        if (ExpirationDate > DateTime.UtcNow)
        {
            Status = JobStatus.Open;
        }
        else
        {
            throw new InvalidOperationException("Cannot reopen a job with an expired expiration date.");
        }
    }

    public void AddApplication(JobApplication application)
    {
        Guard.Against.Null(application, nameof(application));
        Applications.Add(application);
        IncrementApplicantCount();
    }

    public void RemoveApplication(int jobId)
    {
        try
        {
            Guard.Against.Null(jobId, nameof(jobId));
            var selectedJob = Applications.First(application => application.JobId == jobId);
            Applications.Remove(selectedJob);
        }
        catch (Exception e)
        {
            Console.WriteLine("Error: " + e.Message );
            throw;
        }
    }

    // Retrieve an application by ID
    public JobApplication? GetApplicationById(int applicationId)
    {
        return Applications.FirstOrDefault(a => a.Id == applicationId);
    }
}
public enum JobStatus
{
    Open,
    Closed,
    Expired
}
    
public enum EmploymentType
{
    FullTime,
    PartTime,
    Contract,
    Internship,
    Remote,
    Hybrid
}
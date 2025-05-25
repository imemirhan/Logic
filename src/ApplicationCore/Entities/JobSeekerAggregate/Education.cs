using ApplicationCore.Interfaces;
using Ardalis.GuardClauses;

namespace ApplicationCore.Entities.JobSeekerAggregate;

public class Education : BaseEntity, IAggregateRoot
{
    public string Degree { get; set; }
    public string Institution { get; set; }
    public string Branch { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime GraduationDate { get; set; }
    public int JobSeekerId { get; private set; }

    public Education(int jobSeekerId, string degree, string branch, string institution, DateTime startDate,DateTime graduationDate)
    {
        Guard.Against.NullOrEmpty(degree, nameof(degree));
        Guard.Against.NullOrEmpty(institution, nameof(institution));
        Guard.Against.NullOrEmpty(branch, nameof(branch));
        Guard.Against.Null(graduationDate, nameof(graduationDate));
        Guard.Against.Null(startDate, nameof(startDate));
        
        JobSeekerId = jobSeekerId;
        Degree = degree;
        Branch = branch;
        Institution = institution;
        StartDate = startDate;
        GraduationDate = graduationDate;
    }

    #pragma warning disable CS8618
    private Education() { }
}
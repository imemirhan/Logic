using ApplicationCore.Interfaces;
using Ardalis.GuardClauses;

namespace ApplicationCore.Entities.JobSeekerAggregate;

public class Education : BaseEntity, IAggregateRoot
{
    public string Degree { get; set; }
    public string Institution { get; set; }
    
    public int StartYear { get; set; }
    public int GraduationYear { get; set; }

    public int JobSeekerId { get; private set; }

    public Education(string degree, string institution, int startYear,int graduationYear)
    {
        Guard.Against.NullOrEmpty(degree, nameof(degree));
        Guard.Against.NullOrEmpty(institution, nameof(institution));
        Guard.Against.NegativeOrZero(graduationYear, nameof(graduationYear));
        Guard.Against.NegativeOrZero(startYear, nameof(startYear));
        
        Degree = degree;
        Institution = institution;
        StartYear = startYear;
        GraduationYear = graduationYear;
    }

    #pragma warning disable CS8618
    private Education() { }
}
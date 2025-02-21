using Ardalis.GuardClauses;

namespace ApplicationCore.Entities.JobSeekerAggregate;

public class Experience : BaseEntity
{
    public string Title { get; private set; }
    public string Company { get; private set; }
    public int Years { get; private set; }

    public int JobSeekerId { get; private set; }

    public Experience(string title, string company, int years)
    {
        Guard.Against.NullOrEmpty(title, nameof(title));
        Guard.Against.NullOrEmpty(company, nameof(company));
        Guard.Against.NegativeOrZero(years, nameof(years));

        Title = title;
        Company = company;
        Years = years;
    }
    
    #pragma warning disable CS8618
    private Experience() { }
}
using ApplicationCore.Interfaces;
using Ardalis.GuardClauses;

namespace ApplicationCore.Entities.JobSeekerAggregate;

public class Experience : BaseEntity, IAggregateRoot
{
    public string Title { get; set; }
    public string Company { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public bool StillWorking { get; set; }
    public int JobSeekerId { get; private set; }

    public Experience(int jobSeekerId,
                      string title,
                      string company,
                      DateTime startDate,
                      bool stillWorking,
                      DateTime? endDate)
    {
        Guard.Against.NullOrEmpty(title, nameof(title));
        Guard.Against.NullOrEmpty(company, nameof(company));
        Guard.Against.Null(startDate, nameof(startDate));

        JobSeekerId = jobSeekerId;
        Title = title;
        Company = company;
        StartDate = startDate;
        EndDate = endDate;
        StillWorking = stillWorking;
    }
    
    #pragma warning disable CS8618
    private Experience() { }
}
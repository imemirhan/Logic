using ApplicationCore.Entities.JobAggregate;
using ApplicationCore.Interfaces;
using Ardalis.GuardClauses;

namespace ApplicationCore.Entities.EmployerAggregate;

public class Employer : BaseEntity, IAggregateRoot
{
    public string IdentityGuid { get; private set; }
    public string Name { get; private set; }
    public string Surname { get; private set; }
    public string CompanyName { get; private set; }
    public string Description { get; private set; }
    public string Industry { get; private set; }
    public string? ProfileImageUrl { get; private set; }
    public string? LinkedIn { get; private set; }
    public string? GitHub { get; private set; }
    public string? Twitter { get; private set; }
    public string? Facebook { get; private set; }
    public string? Instagram { get; private set; }
    public string? WebsiteUrl { get; private set; }

    public ICollection<Job> JobPostings { get; private set; } = new List<Job>();

#pragma warning disable CS8618
    private Employer() { }

    public Employer(string identityGuid,string name, string surname,string companyName, string description, string industry,
                     string? profileImageUrl = null, string? linkedIn = null, string? gitHub = null, 
                     string? twitter = null, string? facebook = null, string? instagram = null, string? websiteUrl = null)
    {
        Guard.Against.NullOrEmpty(identityGuid, nameof(identityGuid));
        Guard.Against.NullOrEmpty(name, nameof(name));
        Guard.Against.NullOrEmpty(surname, nameof(surname));
        Guard.Against.NullOrEmpty(companyName, nameof(companyName));
        Guard.Against.NullOrEmpty(description, nameof(description));
        Guard.Against.NullOrEmpty(industry, nameof(industry));
        
        IdentityGuid = identityGuid;
        Name = name;
        Surname = surname;
        CompanyName = companyName;
        Description = description;
        Industry = industry;

        ProfileImageUrl = profileImageUrl ?? ProfileImageUrl;
        LinkedIn = linkedIn ?? LinkedIn;
        GitHub = gitHub ?? GitHub;
        Twitter = twitter ?? Twitter;
        Facebook = facebook ?? Facebook;
        Instagram = instagram ?? Instagram;
        WebsiteUrl = websiteUrl ?? WebsiteUrl;
    }

    public void UpdateCompanyDetails(string companyName, string description, string industry, string websiteUrl)
    {
        Guard.Against.NullOrEmpty(companyName, nameof(companyName));
        Guard.Against.NullOrEmpty(description, nameof(description));
        Guard.Against.NullOrEmpty(industry, nameof(industry));
        Guard.Against.NullOrEmpty(websiteUrl, nameof(websiteUrl));

        CompanyName = companyName;
        Description = description;
        Industry = industry;
        WebsiteUrl = websiteUrl;
    }

    public void UpdateContactInfo(string? profileImageUrl = null, string? linkedIn = null, string? gitHub = null,
                                  string? twitter = null, string? facebook = null, string? instagram = null)
    {
        ProfileImageUrl = profileImageUrl ?? ProfileImageUrl;
        LinkedIn = linkedIn ?? LinkedIn;
        GitHub = gitHub ?? GitHub;
        Twitter = twitter ?? Twitter;
        Facebook = facebook ?? Facebook;
        Instagram = instagram ?? Instagram;
    }

    public void AddJobPosting(Job job)
    {
        Guard.Against.Null(job, nameof(job));
        JobPostings.Add(job);
    }

    public void RemoveJobPosting(int jobId)
    {
        var job = JobPostings.FirstOrDefault(j => j.Id == jobId);
        if (job != null)
        {
            JobPostings.Remove(job);
        }
    }
}
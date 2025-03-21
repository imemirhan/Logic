namespace PublicApi.JobSeekerEndpoints.ExperienceEndpoint;

public class AddExperienceByIdRequest : BaseRequest
{
    public int JobSeekerId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;
    public int Years { get; set; }

    public AddExperienceByIdRequest(int jobSeekerId, string title, string company, int years)
    {
        JobSeekerId = jobSeekerId;
        Title = title;
        Company = company;
        Years = years;
    }
}
namespace PublicApi.JobSeekerEndpoints.ExperienceEndpoint;

public class AddExperienceByIdRequest : BaseRequest
{
    public int JobSeekerId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public bool StillWorking { get; set; } = false; 

    public AddExperienceByIdRequest(int jobSeekerId,
                                    string title,
                                    string company,
                                    DateTime startDate,
                                    bool stillWorking = false,
                                    DateTime? endDate = null)
    {
        JobSeekerId = jobSeekerId;
        Title = title;
        Company = company;
        StartDate = startDate;
        EndDate = endDate;
        StillWorking = stillWorking;
    }
}
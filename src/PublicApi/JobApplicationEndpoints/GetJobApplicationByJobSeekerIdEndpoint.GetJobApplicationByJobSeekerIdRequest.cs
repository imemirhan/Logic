namespace PublicApi.JobApplicationEndpoints;

public class GetJobApplicationsByJobSeekerIdRequest : BaseRequest
{
    public int JobSeekerId { get; set; }
}

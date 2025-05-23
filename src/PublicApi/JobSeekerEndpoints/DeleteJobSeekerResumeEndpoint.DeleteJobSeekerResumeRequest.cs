namespace PublicApi.JobSeekerEndpoints;

public class DeleteJobSeekerResumeRequest : BaseRequest
{
    public int JobSeekerId { get; set; }
}
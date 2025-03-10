namespace PublicApi.JobSeekerEndpoints;

public class DeleteJobSeekerRequest : BaseRequest
{
    public int JobSeekerId { get; init; }

    public DeleteJobSeekerRequest(int jobSeekerId)
    {
        JobSeekerId = jobSeekerId;
    }
}
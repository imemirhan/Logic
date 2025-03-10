namespace PublicApi.JobSeekerEndpoints;

public class GetJobSeekerByIdRequest : BaseRequest
{
    public int JobSeekerId { get; init; }

    public GetJobSeekerByIdRequest()
    {
        
    }

    public GetJobSeekerByIdRequest(int jobSeekerId)
    {
        JobSeekerId = jobSeekerId;
    }
}
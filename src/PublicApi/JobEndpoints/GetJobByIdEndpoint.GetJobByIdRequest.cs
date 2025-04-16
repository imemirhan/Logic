namespace PublicApi.JobEndpoints;

public class GetJobByIdRequest : BaseRequest
{
    public int JobId { get; init; }

    public GetJobByIdRequest(int jobId)
    {
        JobId = jobId;
    }
}

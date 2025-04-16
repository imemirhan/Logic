namespace PublicApi.JobEndpoints;

public class DeleteJobRequest : BaseRequest
{
    public int JobId { get; set; }

    public DeleteJobRequest(int jobId)
    {
        JobId = jobId;
    }
}

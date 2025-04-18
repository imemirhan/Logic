namespace PublicApi.JobApplicationEndpoints;

public class GetJobApplicationsByJobIdRequest : BaseRequest
{
    public int JobId { get; set; }
}

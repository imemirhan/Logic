namespace PublicApi.JobApplicationEndpoints;

public class GetJobApplicationsByEmployerIdRequest : BaseRequest
{
    public int EmployerId { get; set; }
}

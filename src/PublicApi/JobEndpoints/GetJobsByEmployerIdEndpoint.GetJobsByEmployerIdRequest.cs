namespace PublicApi.JobEndpoints;

public class GetJobsByEmployerIdRequest : BaseRequest
{
    public int EmployerId { get; set; }

    public GetJobsByEmployerIdRequest(int employerId)
    {
        EmployerId = employerId;
    }
}
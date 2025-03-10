namespace PublicApi.EmployerEndpoints;

public class GetEmployerByIdRequest : BaseRequest
{
    public int EmployerId { get; init; }

    public GetEmployerByIdRequest()
    {
        
    }

    public GetEmployerByIdRequest(int employerId)
    {
        EmployerId = employerId;
    }
}
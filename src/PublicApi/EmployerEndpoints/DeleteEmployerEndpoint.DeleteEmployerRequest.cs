namespace PublicApi.EmployerEndpoints;

public class DeleteEmployerRequest : BaseRequest
{
    public int EmployerId { get; init; }

    public DeleteEmployerRequest(int employerId)
    {
        EmployerId = employerId;
    }
}
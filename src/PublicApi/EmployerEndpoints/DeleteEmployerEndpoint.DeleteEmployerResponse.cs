namespace PublicApi.EmployerEndpoints;

public class DeleteEmployerResponse : BaseResponse
{
    public DeleteEmployerResponse(Guid correlationId) : base(correlationId) { }
    
    public DeleteEmployerResponse()
    {
    }
    
    public string Status { get; set; } = "Deleted";
}
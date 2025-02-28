namespace PublicApi.EmployerEndpoints;

public class CreateEmployerResponse : BaseResponse
{
    public CreateEmployerResponse(Guid correlationId) : base(correlationId)
    {
    }

    public CreateEmployerResponse()
    {
        
    }
    
    public EmployerDto Employer { get; set; }
}
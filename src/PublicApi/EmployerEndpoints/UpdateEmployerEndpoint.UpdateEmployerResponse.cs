namespace PublicApi.EmployerEndpoints;

public class UpdateEmployerResponse : BaseResponse
{
    public UpdateEmployerResponse(Guid correlationId) : base(correlationId) { }

    public UpdateEmployerResponse()
    {
        
    }

    public EmployerReadDto Employer { get; set; }

}
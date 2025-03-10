namespace PublicApi.EmployerEndpoints;

public class GetEmployerByIdResponse : BaseResponse
{
    public GetEmployerByIdResponse(Guid correlationId) : base(correlationId)
    {
        
    }

    public GetEmployerByIdResponse()
    {
        
    }
    
    public List<EmployerReadDto> Employers { get; set; } = new();
}
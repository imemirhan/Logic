using System.Data.Common;

namespace PublicApi.EmployerEndpoints;

public class CreateEmployerResponse : BaseResponse
{
    public CreateEmployerResponse(Guid correlationId) : base(correlationId)
    {
        
    }

    public CreateEmployerResponse()
    {
        
    }
    
    public EmployerReadDto Employer { get; set; }
}
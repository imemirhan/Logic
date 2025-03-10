namespace PublicApi.EmployerEndpoints;

public class GetAllEmployersResponse : BaseResponse
{
    public GetAllEmployersResponse(Guid correlationId) : base(correlationId) { }
    public GetAllEmployersResponse() { }

    public List<EmployerReadDto> Employers { get; set; } = new();
}
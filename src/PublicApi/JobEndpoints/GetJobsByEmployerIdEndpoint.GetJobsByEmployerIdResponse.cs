namespace PublicApi.JobEndpoints;

public class GetJobsByEmployerIdResponse : BaseResponse
{
    public GetJobsByEmployerIdResponse(Guid correlationId) : base(correlationId) { }

    public GetJobsByEmployerIdResponse() { }

    public List<JobReadDto> Jobs { get; set; } = new();
}
namespace PublicApi.JobEndpoints;

public class GetJobByIdResponse : BaseResponse
{
    public GetJobByIdResponse(Guid correlationId) : base(correlationId) { }

    public GetJobByIdResponse() { }

    public JobReadDto? Job { get; set; }
}

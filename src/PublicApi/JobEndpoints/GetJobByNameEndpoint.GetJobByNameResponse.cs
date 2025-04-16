namespace PublicApi.JobEndpoints;

public class GetJobByNameResponse : BaseResponse
{
    public GetJobByNameResponse(Guid correlationId) : base(correlationId) { }

    public GetJobByNameResponse() { }

    public List<JobReadDto> Jobs { get; set; } = new();
}

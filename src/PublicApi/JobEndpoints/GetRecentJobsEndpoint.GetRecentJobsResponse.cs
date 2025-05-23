namespace PublicApi.JobEndpoints;

public class GetRecentJobsResponse : BaseResponse
{
    public GetRecentJobsResponse(Guid correlationId) : base(correlationId) { }

    public GetRecentJobsResponse() { }

    public List<JobReadDto> Jobs { get; set; } = new();
}
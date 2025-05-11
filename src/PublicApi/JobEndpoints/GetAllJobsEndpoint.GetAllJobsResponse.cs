namespace PublicApi.JobEndpoints;

public class GetAllJobsResponse : BaseResponse
{
    public GetAllJobsResponse(Guid correlationId) : base(correlationId) { }

    public List<JobReadDto> Jobs { get; set; } = new();

    public int TotalItems { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
}

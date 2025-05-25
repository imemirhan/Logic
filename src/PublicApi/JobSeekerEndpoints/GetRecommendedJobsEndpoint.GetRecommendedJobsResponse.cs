using PublicApi.JobEndpoints;

namespace PublicApi.JobSeekerEndpoints;

public class GetRecommendedJobsResponse : BaseResponse
{
    public GetRecommendedJobsResponse(Guid correlationId) : base(correlationId) { }

    public GetRecommendedJobsResponse() { }

    public List<JobReadDto> RecommendedJobs { get; set; } = new();
}
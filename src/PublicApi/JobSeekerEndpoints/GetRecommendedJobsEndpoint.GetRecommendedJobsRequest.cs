namespace PublicApi.JobSeekerEndpoints;

public class GetRecommendedJobsRequest : BaseRequest
{
    public int JobSeekerId { get; set; }

    public GetRecommendedJobsRequest() { }

    public GetRecommendedJobsRequest(int jobSeekerId)
    {
        JobSeekerId = jobSeekerId;
    }
}
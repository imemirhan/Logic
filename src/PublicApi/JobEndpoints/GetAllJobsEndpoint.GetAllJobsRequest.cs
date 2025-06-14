using ApplicationCore.Entities.JobAggregate;
namespace PublicApi.JobEndpoints;

public class GetAllJobsRequest : BaseRequest
{
    public string? Title { get; set; }
    public string? Location { get; set; }
    public int JobType { get; set; }

    public int Page { get; set; } = 1;
    public int PageSize { get; set; } = 10;
}
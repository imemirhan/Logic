namespace PublicApi.JobSeekerNotificationEndpoints;

public class GetNotificationsByJobSeekerIdRequest : BaseRequest
{
    public int JobSeekerId { get; set; }
}
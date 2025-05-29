namespace PublicApi.JobSeekerNotificationEndpoints;

public class GetNotOpenedNotificationsByJobSeekerRequest : BaseRequest
{
    public int JobSeekerId { get; set; }
}
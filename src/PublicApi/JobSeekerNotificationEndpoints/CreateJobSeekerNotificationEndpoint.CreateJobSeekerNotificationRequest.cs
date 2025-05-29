namespace PublicApi.JobSeekerNotificationEndpoints;

public class CreateJobSeekerNotificationRequest : BaseRequest
{
    public JobSeekerNotificationCreateDto Notification { get; set; }
}
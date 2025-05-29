namespace PublicApi.JobSeekerNotificationEndpoints;

public class CreateJobSeekerNotificationResponse : BaseResponse
{
    public CreateJobSeekerNotificationResponse(Guid correlationId) : base(correlationId) { }
    public CreateJobSeekerNotificationResponse() { }

    public JobSeekerNotificationReadDto Notification { get; set; }
}
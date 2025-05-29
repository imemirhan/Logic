namespace PublicApi.JobSeekerNotificationEndpoints;

public class GetNotOpenedNotificationsByJobSeekerResponse : BaseResponse
{
    public GetNotOpenedNotificationsByJobSeekerResponse(Guid correlationId) : base(correlationId) { }
    public GetNotOpenedNotificationsByJobSeekerResponse() { }

    public List<JobSeekerNotificationReadDto> Notifications { get; set; } = new();
}
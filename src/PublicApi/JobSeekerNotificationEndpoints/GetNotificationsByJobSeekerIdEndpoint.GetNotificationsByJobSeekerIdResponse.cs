namespace PublicApi.JobSeekerNotificationEndpoints;

public class GetNotificationsByJobSeekerIdResponse : BaseResponse
{
    public GetNotificationsByJobSeekerIdResponse(Guid correlationId) : base(correlationId) { }
    public GetNotificationsByJobSeekerIdResponse() { }

    public List<JobSeekerNotificationReadDto> Notifications { get; set; } = new();
}
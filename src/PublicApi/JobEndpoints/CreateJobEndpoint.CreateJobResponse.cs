namespace PublicApi.JobEndpoints;

public class CreateJobResponse : BaseResponse
{
    public CreateJobResponse(Guid correlationId) : base(correlationId) { }
    public CreateJobResponse() { }

    public JobReadDto Job { get; set; }
}

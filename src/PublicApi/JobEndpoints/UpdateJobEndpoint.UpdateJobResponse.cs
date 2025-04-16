namespace PublicApi.JobEndpoints;

public class UpdateJobResponse : BaseResponse
{
    public UpdateJobResponse(Guid correlationId) : base(correlationId) { }

    public UpdateJobResponse() { }

    public JobReadDto Job { get; set; }
}

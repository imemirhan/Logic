namespace PublicApi.JobApplicationEndpoints;

public class CreateJobApplicationResponse : BaseResponse
{
    public CreateJobApplicationResponse(Guid correlationId) : base(correlationId) { }
    public CreateJobApplicationResponse() { }

    public JobApplicationReadDto JobApplication { get; set; }
}

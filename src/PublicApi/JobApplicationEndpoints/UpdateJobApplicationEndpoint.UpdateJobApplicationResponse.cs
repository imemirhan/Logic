namespace PublicApi.JobApplicationEndpoints;

public class UpdateJobApplicationResponse : BaseResponse
{
    public UpdateJobApplicationResponse(Guid correlationId) : base(correlationId) { }
    public UpdateJobApplicationResponse() { }

    public JobApplicationReadDto JobApplication { get; set; }
}

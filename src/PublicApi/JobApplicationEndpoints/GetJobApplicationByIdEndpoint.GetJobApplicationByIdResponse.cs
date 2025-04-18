namespace PublicApi.JobApplicationEndpoints;

public class GetJobApplicationByIdResponse : BaseResponse
{
    public GetJobApplicationByIdResponse(Guid correlationId) : base(correlationId) { }
    public GetJobApplicationByIdResponse() { }

    public JobApplicationReadDto? JobApplication { get; set; }
}

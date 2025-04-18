namespace PublicApi.JobApplicationEndpoints;

public class GetJobApplicationsByJobIdResponse : BaseResponse
{
    public GetJobApplicationsByJobIdResponse(Guid correlationId) : base(correlationId) { }
    public GetJobApplicationsByJobIdResponse() { }

    public List<JobApplicationReadDto> JobApplications { get; set; } = new();
}

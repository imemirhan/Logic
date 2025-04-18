namespace PublicApi.JobApplicationEndpoints;

public class GetJobApplicationsByEmployerIdResponse : BaseResponse
{
    public GetJobApplicationsByEmployerIdResponse(Guid correlationId) : base(correlationId) { }
    public GetJobApplicationsByEmployerIdResponse() { }

    public List<JobApplicationReadDto> JobApplications { get; set; } = new();
}

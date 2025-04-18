namespace PublicApi.JobApplicationEndpoints;

public class GetJobApplicationsByJobSeekerIdResponse : BaseResponse
{
    public GetJobApplicationsByJobSeekerIdResponse(Guid correlationId) : base(correlationId) { }
    public GetJobApplicationsByJobSeekerIdResponse() { }

    public List<JobApplicationReadDto> JobApplications { get; set; } = new();
}

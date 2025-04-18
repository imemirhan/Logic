namespace PublicApi.JobApplicationEndpoints;

public class GetAllJobApplicationsResponse : BaseResponse
{
    public GetAllJobApplicationsResponse(Guid correlationId) : base(correlationId) { }
    public GetAllJobApplicationsResponse() { }

    public List<JobApplicationReadDto> JobApplications { get; set; } = new();
}

namespace PublicApi.JobSeekerEndpoints;

public class CreateJobSeekerResponse : BaseResponse
{
    public CreateJobSeekerResponse(Guid correlationId) : base(correlationId) { }
    
    public CreateJobSeekerResponse() { }
    
    public JobSeekerReadDto JobSeeker { get; set; }
}
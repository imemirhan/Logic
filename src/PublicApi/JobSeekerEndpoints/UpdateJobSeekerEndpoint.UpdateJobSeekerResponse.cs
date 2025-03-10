namespace PublicApi.JobSeekerEndpoints;

public class UpdateJobSeekerResponse : BaseResponse
{
    public UpdateJobSeekerResponse(Guid correlationId) : base(correlationId)
    {
        
    }

    public UpdateJobSeekerResponse()
    {
        
    }
    
    public JobSeekerReadDto JobSeeker { get; set; }
}
namespace PublicApi.JobSeekerEndpoints;

public class DeleteJobSeekerResponse : BaseResponse
{
    public DeleteJobSeekerResponse(Guid correlationId) : base(correlationId)
    {
        
    }

    public DeleteJobSeekerResponse()
    {
        
    }
    
    public string Status { get; set; } = "Deleted";
}
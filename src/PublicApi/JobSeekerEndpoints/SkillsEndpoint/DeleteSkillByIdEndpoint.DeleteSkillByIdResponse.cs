namespace PublicApi.JobSeekerEndpoints.SkillsEndpoint;

public class DeleteSkillByIdResponse : BaseResponse
{
    public DeleteSkillByIdResponse(Guid correlationId) : base(correlationId)
    {
        
    }

    public DeleteSkillByIdResponse()
    {
        
    }
        
    public string Status { get; set; } = "Deleted";
}
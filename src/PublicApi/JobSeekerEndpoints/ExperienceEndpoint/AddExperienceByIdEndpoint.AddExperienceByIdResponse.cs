namespace PublicApi.JobSeekerEndpoints.ExperienceEndpoint;

public class AddExperienceByIdResponse : BaseResponse
{
    public AddExperienceByIdResponse(Guid correlationId) : base(correlationId)
    {
        
    }

    public AddExperienceByIdResponse()
    {
        
    }
    
    public JobSeekerExperienceReadDto Experience { get; set; } = new();
}
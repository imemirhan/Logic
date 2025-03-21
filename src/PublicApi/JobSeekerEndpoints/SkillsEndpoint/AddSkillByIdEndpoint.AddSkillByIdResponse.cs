namespace PublicApi.JobSeekerEndpoints.SkillsEndpoint;

public class AddSkillByIdResponse : BaseResponse
{
    public AddSkillByIdResponse(Guid correlationId) : base(correlationId) { }

    public AddSkillByIdResponse() { }
        
    public string Status { get; set; } = "Skill Added";
}
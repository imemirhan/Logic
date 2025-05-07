namespace PublicApi.JobSeekerEndpoints.SkillsEndpoint;

public class AddSkillByIdResponse : BaseResponse
{
    public AddSkillByIdResponse(Guid correlationId) : base(correlationId) { }

    public AddSkillByIdResponse() { }
        
    public JobSeekerSkillReadDto Skill { get; set; } = new();
}
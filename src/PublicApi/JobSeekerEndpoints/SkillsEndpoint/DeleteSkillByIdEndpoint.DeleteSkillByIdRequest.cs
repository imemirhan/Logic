namespace PublicApi.JobSeekerEndpoints.SkillsEndpoint;

public class DeleteSkillByIdRequest : BaseRequest
{
    public int SkillId { get; init; }

    public DeleteSkillByIdRequest(int skillId)
    {
        SkillId = skillId;
    }
}
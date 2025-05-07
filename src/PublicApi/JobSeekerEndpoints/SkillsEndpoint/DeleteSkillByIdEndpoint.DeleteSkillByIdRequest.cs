namespace PublicApi.JobSeekerEndpoints.SkillsEndpoint;

public class DeleteSkillByIdRequest : BaseRequest
{
    public int SkillId { get; set; }

    public DeleteSkillByIdRequest(int skillId)
    {
        SkillId = skillId;
    }
}
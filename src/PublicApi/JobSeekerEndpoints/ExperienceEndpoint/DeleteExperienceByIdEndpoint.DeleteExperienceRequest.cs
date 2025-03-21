namespace PublicApi.JobSeekerEndpoints.ExperienceEndpoint;

public class DeleteExperienceRequest : BaseRequest
{
    public int ExperienceId { get; set; }

    public DeleteExperienceRequest(int experienceId)
    {
        ExperienceId = experienceId;
    }
}
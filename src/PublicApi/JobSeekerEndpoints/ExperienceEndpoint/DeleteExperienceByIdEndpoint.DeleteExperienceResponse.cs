namespace PublicApi.JobSeekerEndpoints.ExperienceEndpoint;

public class DeleteExperienceResponse : BaseResponse
{
    public DeleteExperienceResponse(Guid correlationId) : base(correlationId)
    {
    }

    public DeleteExperienceResponse()
    {
    }

    public string Status { get; set; } = "Deleted";
}
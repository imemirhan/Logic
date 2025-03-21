namespace PublicApi.JobSeekerEndpoints.EducationsEndpoint;

public class DeleteEducationByIdRequest : BaseRequest
{
    public int EducationId { get; set; }

    public DeleteEducationByIdRequest(int educationId)
    {
        EducationId = educationId;
    }
}
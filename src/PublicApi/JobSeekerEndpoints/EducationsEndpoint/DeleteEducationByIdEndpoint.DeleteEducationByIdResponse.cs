namespace PublicApi.JobSeekerEndpoints.EducationsEndpoint;

public class DeleteEducationByIdResponse : BaseResponse
{
    public DeleteEducationByIdResponse(Guid correlationId) : base(correlationId)
    {
        
    }

    public DeleteEducationByIdResponse()
    {
        
    }
    
    public string Status { get; set; } = "Deleted";

}
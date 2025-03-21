namespace PublicApi.JobSeekerEndpoints.EducationsEndpoint;

public class AddEducationByIdResponse : BaseResponse
{
    public AddEducationByIdResponse(Guid correlationId) : base(correlationId) { }

    public AddEducationByIdResponse()
    {
        
    }
    public JobSeekerEducationReadDto Education { get; set; } = new();
}
namespace PublicApi.JobSeekerEndpoints;

public class GetJobSeekerByIdResponse : BaseResponse
{
    public GetJobSeekerByIdResponse(Guid correlationId) : base(correlationId)
    {
        
    }

    public GetJobSeekerByIdResponse()
    {
        
    }
    
    public List<JobSeekerReadDto> Employers { get; set; } = new();

}
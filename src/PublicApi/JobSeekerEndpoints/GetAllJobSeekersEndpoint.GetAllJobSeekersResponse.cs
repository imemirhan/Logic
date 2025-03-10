namespace PublicApi.JobSeekerEndpoints;

public class GetAllJobSeekersResponse : BaseResponse
{
    public GetAllJobSeekersResponse(Guid correlationId) : base(correlationId) { }

    public GetAllJobSeekersResponse()
    {
        
    }
    public List<JobSeekerReadDto> JobSeekers { get; set; } = new();

}
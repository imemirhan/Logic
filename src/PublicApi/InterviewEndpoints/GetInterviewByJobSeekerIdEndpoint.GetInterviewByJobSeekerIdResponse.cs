namespace PublicApi.InterviewEndpoints;

public class GetInterviewsByJobSeekerIdResponse : BaseResponse
{
    public GetInterviewsByJobSeekerIdResponse(Guid correlationId) : base(correlationId) { }
    public GetInterviewsByJobSeekerIdResponse() { }

    public List<InterviewReadDto> Interviews { get; set; } = new();
}
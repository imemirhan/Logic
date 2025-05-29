namespace PublicApi.InterviewEndpoints;

public class GetInterviewByIdResponse : BaseResponse
{
    public GetInterviewByIdResponse(Guid correlationId) : base(correlationId) { }
    public GetInterviewByIdResponse() { }

    public InterviewReadDto Interview { get; set; }
}
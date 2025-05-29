namespace PublicApi.InterviewEndpoints;

public class CreateInterviewResponse : BaseResponse
{
    public CreateInterviewResponse(Guid correlationId) : base(correlationId) { }
    public CreateInterviewResponse() { }

    public InterviewReadDto Interview { get; set; }
}
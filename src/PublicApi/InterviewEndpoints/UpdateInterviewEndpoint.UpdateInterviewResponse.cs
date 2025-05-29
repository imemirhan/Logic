namespace PublicApi.InterviewEndpoints;

public class UpdateInterviewResponse : BaseResponse
{
    public UpdateInterviewResponse(Guid correlationId) : base(correlationId) { }
    public UpdateInterviewResponse() { }

    public InterviewReadDto Interview { get; set; }
}
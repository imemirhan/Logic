namespace PublicApi.InterviewEndpoints;

public class DeleteInterviewResponse : BaseResponse
{
    public DeleteInterviewResponse(Guid correlationId) : base(correlationId) { }
    public DeleteInterviewResponse() { }

    public string Message { get; set; }
}
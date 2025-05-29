namespace PublicApi.InterviewEndpoints;

public class CreateInterviewRequest : BaseRequest
{
    public InterviewCreateDto Interview { get; set; }
}
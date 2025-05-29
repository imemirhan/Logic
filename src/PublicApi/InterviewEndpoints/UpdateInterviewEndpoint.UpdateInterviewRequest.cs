namespace PublicApi.InterviewEndpoints;

public class UpdateInterviewRequest : BaseRequest
{
    public int Id { get; set; }
    public InterviewUpdateDto Interview { get; set; }
}
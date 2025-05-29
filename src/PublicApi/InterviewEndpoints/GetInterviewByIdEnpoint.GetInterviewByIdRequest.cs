namespace PublicApi.InterviewEndpoints;

public class GetInterviewByIdRequest : BaseRequest
{
    public int Id { get; set; }
}
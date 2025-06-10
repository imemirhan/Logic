namespace PublicApi.InterviewEndpoints;

public class GetInterviewsByJobSeekerIdRequest : BaseRequest
{
    public int JobSeekerId { get; set; }
}
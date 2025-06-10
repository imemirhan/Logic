namespace PublicApi.InterviewEndpoints;

public class CreateInterviewRequest : BaseRequest
{
    public int JobId { get; set; }
    public int EmployerId { get; set; }
    public int JobSeekerId { get; set; }
    public string InterViewLink { get; set; }
    public DateTime InterviewScheduledDate { get; set; }
}
namespace PublicApi.InterviewEndpoints;

public class InterviewCreateDto
{
    public int JobId { get; set; }
    public int JobSeekerId { get; set; }
    public int EmployerId { get; set; }
    public string InterviewLink { get; set; }
    public DateTime InterviewScheduledDate { get; set; }
}
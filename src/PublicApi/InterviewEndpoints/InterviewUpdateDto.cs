namespace PublicApi.InterviewEndpoints;

public class InterviewUpdateDto
{
    public DateTime? InterviewScheduledDate { get; set; }
    public string? InterViewLink { get; set; }
    public string? EmployerFeedback { get; set; }
    public string? InterviewNotes { get; set; }
    public bool? IsAccepted { get; set; }
    public bool? IsAttended { get; set; }
}
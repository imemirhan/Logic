namespace PublicApi.InterviewEndpoints;

public class InterviewReadDto
{
    public int Id { get; set; }
    public int JobId { get; set; }
    public int JobSeekerId { get; set; }
    public int EmployerId { get; set; }
    public string InterViewLink { get; set; }
    public DateTime InterviewScheduledDate { get; set; }
    public bool IsAccepted { get; set; }
    public bool IsAttended { get; set; }
    public string? InterviewNotes { get; set; }
    public string? EmployerFeedback { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}
namespace PublicApi.FeedbackEndpoints;

public class CreateFeedbackResponse : BaseResponse
{
    public CreateFeedbackResponse(Guid correlationId) : base(correlationId) { }
    public CreateFeedbackResponse() { }

    public FeedbackDto Feedback { get; set; }
}

public class FeedbackDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Message { get; set; }
    public DateTime CreatedAt { get; set; }
}
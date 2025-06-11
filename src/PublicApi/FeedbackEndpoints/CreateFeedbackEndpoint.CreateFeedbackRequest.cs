namespace PublicApi.FeedbackEndpoints;

public class CreateFeedbackRequest : BaseRequest
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Message { get; set; }
}
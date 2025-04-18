namespace PublicApi.JobApplicationEndpoints;

public class DeleteJobApplicationResponse : BaseResponse
{
    public DeleteJobApplicationResponse(Guid correlationId) : base(correlationId) { }
    public DeleteJobApplicationResponse() { }

    public int DeletedJobApplicationId { get; set; }
}

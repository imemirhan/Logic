namespace PublicApi.JobEndpoints;

public class DeleteJobResponse : BaseResponse
{
    public DeleteJobResponse(Guid correlationId) : base(correlationId) { }

    public DeleteJobResponse() { }

    public bool IsDeleted { get; set; }
}

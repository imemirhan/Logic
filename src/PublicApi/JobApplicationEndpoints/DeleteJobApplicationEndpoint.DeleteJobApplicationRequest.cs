namespace PublicApi.JobApplicationEndpoints;

public class DeleteJobApplicationRequest : BaseRequest
{
    public int Id { get; set; } // JobApplication ID to delete
}

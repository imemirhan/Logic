namespace PublicApi.JobApplicationEndpoints;

public class UpdateJobApplicationRequest : BaseRequest
{
    public int Id { get; set; } // Id of the job application to update
    public JobApplicationUpdateDto JobApplication { get; set; } = new();
}

namespace PublicApi.JobApplicationEndpoints;

public class CreateJobApplicationRequest : BaseRequest
{
    public JobApplicationCreateDto JobApplication { get; set; }
}

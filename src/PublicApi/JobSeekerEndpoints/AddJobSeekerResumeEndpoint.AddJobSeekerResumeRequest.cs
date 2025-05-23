using Microsoft.AspNetCore.Http;

namespace PublicApi.JobSeekerEndpoints;

public class AddJobSeekerResumeRequest : BaseRequest
{
    public int JobSeekerId { get; set; }
    public IFormFile File { get; set; }
}
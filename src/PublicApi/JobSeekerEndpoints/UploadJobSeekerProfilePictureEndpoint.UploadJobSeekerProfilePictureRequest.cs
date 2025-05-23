using Microsoft.AspNetCore.Http;

namespace PublicApi.JobSeekerEndpoints;

public class UploadJobSeekerProfilePictureRequest : BaseRequest
{
    public int JobSeekerId { get; set; }
    public IFormFile File { get; set; }
}
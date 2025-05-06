using Microsoft.AspNetCore.Http;

namespace PublicApi.JobSeekerEndpoints;

public class UploadJobSeekerProfilePictureRequest
{
    public int JobSeekerId { get; set; }
    public IFormFile File { get; set; }
}
using Microsoft.AspNetCore.Http;

namespace PublicApi.EmployerEndpoints;

public class UploadEmployerProfilePictureRequest
{
    public int employerId { get; set; }
    public IFormFile File { get; set; }
}

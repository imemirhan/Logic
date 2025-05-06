using Microsoft.AspNetCore.Http.HttpResults;

namespace PublicApi.JobSeekerEndpoints;

public class UploadJobSeekerProfilePictureResponse
{
    public UploadJobSeekerProfilePictureResponse(Guid correlationId) { }

    public UploadJobSeekerProfilePictureResponse() { }

    public StatusCodeHttpResult StatusCode { get; set; }
}
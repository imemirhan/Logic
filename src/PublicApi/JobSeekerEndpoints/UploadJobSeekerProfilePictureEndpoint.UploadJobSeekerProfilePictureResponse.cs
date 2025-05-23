using Microsoft.AspNetCore.Http.HttpResults;

namespace PublicApi.JobSeekerEndpoints;

public class UploadJobSeekerProfilePictureResponse : BaseResponse
{
    public UploadJobSeekerProfilePictureResponse(Guid correlationId) { }

    public UploadJobSeekerProfilePictureResponse() { }

    public StatusCodeHttpResult StatusCode { get; set; }
}
using Microsoft.AspNetCore.Http.HttpResults;

namespace PublicApi.JobSeekerEndpoints;

public class DeleteJobSeekerProfilePictureResponse
{
    public DeleteJobSeekerProfilePictureResponse(Guid correlationId) { }

    public DeleteJobSeekerProfilePictureResponse() { }

    public StatusCodeHttpResult StatusCode { get; set; }
}
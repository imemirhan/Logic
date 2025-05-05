using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;

namespace PublicApi.EmployerEndpoints;

public class UploadEmployerProfilePictureResponse
{
    public UploadEmployerProfilePictureResponse(Guid correlationId) : base() { }

    public UploadEmployerProfilePictureResponse()
    {
        
    }

    public StatusCodeHttpResult StatusCode { get; set; }
}
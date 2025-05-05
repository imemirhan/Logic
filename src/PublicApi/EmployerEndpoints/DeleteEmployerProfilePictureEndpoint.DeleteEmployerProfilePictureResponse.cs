using Microsoft.AspNetCore.Http.HttpResults;

namespace PublicApi.EmployerEndpoints;

public class DeleteEmployerProfilePictureResponse
{
    public DeleteEmployerProfilePictureResponse(Guid correlationId) : base() { }

    public DeleteEmployerProfilePictureResponse()
    {
        
    }

    public StatusCodeHttpResult StatusCode { get; set; }
}
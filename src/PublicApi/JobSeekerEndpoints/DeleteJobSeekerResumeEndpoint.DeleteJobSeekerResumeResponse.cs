using Microsoft.AspNetCore.Http.HttpResults;

namespace PublicApi.JobSeekerEndpoints;

public class DeleteJobSeekerResumeResponse : BaseResponse
{
    public DeleteJobSeekerResumeResponse(Guid correlationId)
    {
    }

    public DeleteJobSeekerResumeResponse()
    {
    }

    public StatusCodeHttpResult StatusCode { get; set; }
}
﻿using Microsoft.AspNetCore.Http.HttpResults;

namespace PublicApi.JobSeekerEndpoints;

public class AddJobSeekerResumeResponse : BaseResponse
{
    public AddJobSeekerResumeResponse(Guid correlationId)
    {
    }

    public AddJobSeekerResumeResponse()
    {
    }

    public StatusCodeHttpResult StatusCode { get; set; }
}
    
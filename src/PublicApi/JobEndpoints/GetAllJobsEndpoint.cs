using ApplicationCore.Entities.JobAggregate;
using ApplicationCore.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using MinimalApi.Endpoint;

namespace PublicApi.JobEndpoints;

public class GetAllJobsEndpoint : IEndpoint<IResult, GetAllJobsRequest, IRepository<Job>>
{
    private readonly IMapper _mapper;

    public GetAllJobsEndpoint(IMapper mapper)
    {
        _mapper = mapper;
    }

    public async Task<IResult> HandleAsync(GetAllJobsRequest request, IRepository<Job> repository)
    {
        var jobs = repository.GetAll(); // IQueryable
        if (!jobs.Any())
        {
            return Results.NotFound("No jobs found.");
        }

        var jobList = await jobs.ToListAsync();
        var jobDtos = _mapper.Map<List<JobReadDto>>(jobList);

        return Results.Ok(new GetAllJobsResponse(request.CorrelationId()) { Jobs = jobDtos });
    }

    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapGet("api/jobs", 
                async (IRepository<Job> jobRepository, IMapper mapper) =>
                {
                    var endpoint = new GetAllJobsEndpoint(mapper);
                    return await endpoint.HandleAsync(new GetAllJobsRequest(), jobRepository);
                })
            .Produces<GetAllJobsResponse>()
            .WithTags("Job Endpoints");
    }
}
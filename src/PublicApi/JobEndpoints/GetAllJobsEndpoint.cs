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

        // Apply filters based on request parameters
        if (!string.IsNullOrWhiteSpace(request.Title) && request.Title.Length >= 3)
        {
            jobs = jobs.Where(j => j.Title.Contains(request.Title) || j.Description.Contains(request.Title));
        }

        if (!string.IsNullOrWhiteSpace(request.Location) && request.Location.Length >= 3)
        {
            jobs = jobs.Where(j => j.Location.Contains(request.Location));
        }

        if (request.JobType.HasValue)
            jobs = jobs.Where(j => j.EType == request.JobType.Value);
        
        var totalItems = await jobs.CountAsync();

        var pagedJobs = await jobs
            .Skip((request.Page - 1) * request.PageSize)
            .Take(request.PageSize)
            .ToListAsync();

        var jobDtos = _mapper.Map<List<JobReadDto>>(pagedJobs);

        return Results.Ok(new GetAllJobsResponse(request.CorrelationId())
        {
            Jobs = jobDtos,
            TotalItems = totalItems,
            Page = request.Page,
            PageSize = request.PageSize
        });
    }

    public void AddRoute(IEndpointRouteBuilder app)
    {
        // Modify this to accept query parameters instead of the body
        app.MapGet("api/jobs", 
                async (IRepository<Job> jobRepository, IMapper mapper, 
                      string? title, string? location, 
                      EmploymentType? jobType, int page = 1, int pageSize = 10) =>
                {
                    var endpoint = new GetAllJobsEndpoint(mapper);

                    // Pass the query parameters to the request object
                    var request = new GetAllJobsRequest
                    {
                        Title = title,
                        Location = location,
                        JobType = jobType,
                        Page = page,
                        PageSize = pageSize
                    };

                    return await endpoint.HandleAsync(request, jobRepository);
                })
            .Produces<GetAllJobsResponse>()
            .WithTags("Job Endpoints");
    }
}

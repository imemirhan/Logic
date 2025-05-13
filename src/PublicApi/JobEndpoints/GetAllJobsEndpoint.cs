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
        // Normalize request parameters: trim spaces and convert to lowercase
        var normalizedTitle = string.IsNullOrWhiteSpace(request.Title) ? string.Empty : request.Title.Trim().ToLower();
        var normalizedLocation = string.IsNullOrWhiteSpace(request.Location) ? string.Empty : request.Location.Trim().ToLower();

        var jobs = repository.GetAll(); // IQueryable

        // Apply filters based on request parameters
        if (!string.IsNullOrWhiteSpace(normalizedTitle) && normalizedTitle.Length >= 3)
        {
            jobs = jobs.Where(j => 
                j.Title.ToLower().Contains(normalizedTitle) || 
                j.Description.ToLower().Contains(normalizedTitle)
            );
        }

        if (!string.IsNullOrWhiteSpace(normalizedLocation) && normalizedLocation.Length >= 3)
        {
            jobs = jobs.Where(j => j.Location.ToLower().Contains(normalizedLocation));
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

using ApplicationCore.Entities.JobSeekerAggregate;
using ApplicationCore.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using MinimalApi.Endpoint;
using PublicApi.EmployerEndpoints;

namespace PublicApi.JobSeekerEndpoints;

public class GetJobSeekerByIdEndpoint : IEndpoint<IResult, GetJobSeekerByIdRequest, IRepository<JobSeeker>>
{
    private readonly IMapper _mapper;

    public GetJobSeekerByIdEndpoint(IMapper mapper)
    {
        _mapper = mapper;
    }
    
    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapGet("api/jobseekers/{jobSeekerId}", 
                async (int jobSeekerId, IRepository<JobSeeker> employerRepository) =>
                {
                    return await HandleAsync(new GetJobSeekerByIdRequest{ JobSeekerId = jobSeekerId }, employerRepository);
                })
            .Produces<GetEmployerByIdResponse>()    
            .WithTags("JobSeeker Endpoints");
    }

    public async Task<IResult> HandleAsync(GetJobSeekerByIdRequest request, IRepository<JobSeeker> repository)
    {
        var employer =  await repository
            .GetAll()
            .Include(js => js.Skills)
            .FirstOrDefaultAsync(js => js.Id == request.JobSeekerId);
        if (employer == null)
            return Results.NotFound($"Job Seeker with ID {request.JobSeekerId} not found.");

        var employerByIdDto = _mapper.Map<JobSeekerReadDto>(employer);
        return Results.Ok(employerByIdDto);
    }
}
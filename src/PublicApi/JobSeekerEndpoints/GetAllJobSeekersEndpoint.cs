using ApplicationCore.Entities.JobSeekerAggregate;
using ApplicationCore.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using MinimalApi.Endpoint;

namespace PublicApi.JobSeekerEndpoints
{
    public class GetAllJobSeekersEndpoint : IEndpoint<IResult, GetAllJobSeekersRequest, IRepository<JobSeeker>>
    {
        private readonly IMapper _mapper;

        public GetAllJobSeekersEndpoint(IMapper mapper)
        {
            _mapper = mapper;
        }

        public async Task<IResult> HandleAsync(GetAllJobSeekersRequest request, IRepository<JobSeeker> repository)
        {
            // Fetch all job seekers from the repository
            //Include in order to get their properties too...
            var jobSeekers = repository
                .GetAll()
                .Include(js => js.Skills)
                .Include(js => js.Experiences)
                .Include(js => js.Educations);
            if (!jobSeekers.Any())
            {
                return Results.NotFound("No job seekers found.");
            }

            // Map the list of job seekers to DTOs
            var jobSeekerDtos = _mapper.Map<List<JobSeekerReadDto>>(jobSeekers);

            return Results.Ok(new GetAllJobSeekersResponse(request.CorrelationId()) { JobSeekers = jobSeekerDtos });
        }

        public void AddRoute(IEndpointRouteBuilder app)
        {
            app.MapGet("api/jobseekers", 
                    async (IRepository<JobSeeker> jobSeekerRepository) =>
                    {
                        return await HandleAsync(new GetAllJobSeekersRequest(), jobSeekerRepository);
                    })
                .Produces<GetAllJobSeekersResponse>()
                .WithTags("JobSeeker Endpoints");
        }
    }
}
using ApplicationCore.Entities.JobSeekerAggregate;
using ApplicationCore.Interfaces;
using Ardalis.GuardClauses;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.JobSeekerEndpoints
{
    public class UpdateJobSeekerEndpoint : IEndpoint<IResult, UpdateJobSeekerRequest, IRepository<JobSeeker>>
    {
        private readonly IMapper _mapper;

        public UpdateJobSeekerEndpoint(IMapper mapper)
        {
            _mapper = mapper;
        }

        public async Task<IResult> HandleAsync(UpdateJobSeekerRequest request, IRepository<JobSeeker> repository)
        {
            Guard.Against.Null(request, nameof(request));
            Guard.Against.NullOrWhiteSpace(request.Name, nameof(request.Name));
            Guard.Against.NullOrWhiteSpace(request.LastName, nameof(request.LastName));

            // Find the existing job seeker
            var existingJobSeeker = await repository.GetByIdAsync(request.JobSeekerId);
            if (existingJobSeeker == null)
            {
                return Results.NotFound($"Job Seeker with ID {request.JobSeekerId} not found.");
            }

            // Update the job seeker details
            existingJobSeeker.UpdateInfo(request.Name, request.LastName, DateTime.UtcNow, request.AboutMe, request.ResumeUrl);

            // Update contact info
            existingJobSeeker.UpdateContactInfo(DateTime.UtcNow, request.ProfileImageUrl, request.LinkedIn, request.GitHub, request.Twitter, request.Facebook, request.Instagram);

            // Persist the changes
            await repository.UpdateAsync(existingJobSeeker);

            // Map to DTO and return the response
            var jobSeekerDto = _mapper.Map<JobSeekerReadDto>(existingJobSeeker);

            return Results.Ok(new UpdateJobSeekerResponse(request.CorrelationId()) { JobSeeker = jobSeekerDto });
        }

        public void AddRoute(IEndpointRouteBuilder app)
        {
            app.MapPut("api/jobseekers/{jobSeekerId:int}",
                [Authorize(Roles = Shared.Authorization.Constants.Roles.ADMINISTRATORS, AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
                async (int jobSeekerId, UpdateJobSeekerRequest request, IRepository<JobSeeker> repository) =>
                {
                    request.JobSeekerId = jobSeekerId; // Ensure the ID from the route is set
                    return await HandleAsync(request, repository);
                })
            .Accepts<UpdateJobSeekerRequest>("application/json")
            .Produces<UpdateJobSeekerResponse>()
            .WithTags("JobSeeker Endpoints");
        }
    }
}

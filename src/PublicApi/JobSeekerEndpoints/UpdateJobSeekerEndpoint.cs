using ApplicationCore.Entities.JobSeekerAggregate;
using ApplicationCore.Interfaces;
using Ardalis.GuardClauses;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using MinimalApi.Endpoint;
using Infrastructure.Data; // Replace with actual namespace of your DbContext

namespace PublicApi.JobSeekerEndpoints;

public class UpdateJobSeekerEndpoint : IEndpoint<IResult, UpdateJobSeekerRequest, AppDbContext, ITagGeneratorService>
{
    private readonly IMapper _mapper;

    public UpdateJobSeekerEndpoint(IMapper mapper)
    {
        _mapper = mapper;
    }

    public async Task<IResult> HandleAsync(UpdateJobSeekerRequest request, AppDbContext dbContext, ITagGeneratorService tagGenerator)
    {
        Guard.Against.Null(request, nameof(request));
        Guard.Against.NullOrWhiteSpace(request.Name, nameof(request.Name));
        Guard.Against.NullOrWhiteSpace(request.LastName, nameof(request.LastName));

        var existingJobSeeker = await dbContext.JobSeekers
            .Include(js => js.Skills)
            .Include(js => js.Educations)
            .Include(js => js.Experiences)
            .FirstOrDefaultAsync(js => js.Id == request.JobSeekerId);

        if (existingJobSeeker == null)
            return Results.NotFound($"Job Seeker with ID {request.JobSeekerId} not found.");

        existingJobSeeker.UpdateInfo(request.Name, request.LastName, request.OpenToRemote, DateTime.UtcNow, request.AboutMe, request.PreferredLocation);
        existingJobSeeker.UpdateContactInfo(DateTime.UtcNow, request.LinkedIn, request.GitHub, request.Twitter, request.Facebook, request.Instagram);

        // Generate updated tags now that navigation properties are loaded
        existingJobSeeker.Tags = tagGenerator.GenerateTagsForJobSeeker(existingJobSeeker);

        dbContext.JobSeekers.Update(existingJobSeeker);
        await dbContext.SaveChangesAsync();

        var jobSeekerDto = _mapper.Map<JobSeekerReadDto>(existingJobSeeker);
        var response = new UpdateJobSeekerResponse(request.CorrelationId())
        {
            JobSeeker = jobSeekerDto
        };

        return Results.Ok(response);
    }

    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapPut("api/jobseekers/{jobSeekerId:int}",
            [Authorize(Roles = Shared.Authorization.Constants.Roles.JOBSEEKER,
                AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
            async (int jobSeekerId, UpdateJobSeekerRequest request, AppDbContext dbContext, ITagGeneratorService tagGenerator) =>
            {
                request.JobSeekerId = jobSeekerId;
                return await HandleAsync(request, dbContext, tagGenerator);
            })
        .Accepts<UpdateJobSeekerRequest>("application/json")
        .Produces<UpdateJobSeekerResponse>()
        .WithTags("JobSeeker Endpoints");
    }
}

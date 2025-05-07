using ApplicationCore.Entities.JobSeekerAggregate;
using ApplicationCore.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.JobSeekerEndpoints.EducationsEndpoint;

public class AddEducationByIdEndpoint : IEndpoint<IResult, AddEducationByIdRequest, IRepository<JobSeeker>>
{
    
    private readonly IMapper _mapper;

    public AddEducationByIdEndpoint(IMapper mapper)
    {
        _mapper = mapper;
    }
    
    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapPost("api/educations",
                async (AddEducationByIdRequest request, IRepository<JobSeeker> jobSeekerRepository) =>
                {
                    return await HandleAsync(request, jobSeekerRepository);
                })
            .WithName("AddEducationToJobSeeker")
            .WithDescription("Adds an education record to a job seeker")
            .Produces<AddEducationByIdResponse>(StatusCodes.Status201Created)
            .WithTags("Education Endpoints");
    }



    public async Task<IResult> HandleAsync(AddEducationByIdRequest request, IRepository<JobSeeker> jobSeekerRepository)
    {
        var jobSeeker = await jobSeekerRepository.GetByIdAsync(request.JobSeekerId);

        if (jobSeeker == null)
            return Results.NotFound($"JobSeeker with ID {request.JobSeekerId} not found");

        var newEducation = new Education(request.JobSeekerId, request.Degree, request.Institution, request.StartYear, request.GraduationYear);
    
        jobSeeker.AddEducation(newEducation);
    
        await jobSeekerRepository.UpdateAsync(jobSeeker);
        await jobSeekerRepository.SaveChangesAsync();
        var educationDto = _mapper.Map<JobSeekerEducationReadDto>(newEducation);
        return Results.Created($"/api/educations/{request.JobSeekerId}/{newEducation.Id}", educationDto);
    }


}

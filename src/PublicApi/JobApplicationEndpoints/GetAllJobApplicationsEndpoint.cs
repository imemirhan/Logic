using ApplicationCore.Entities.JobAggregate;
using ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;
using PublicApi.JobApplicationEndpoints;
using ApplicationCore.Entities.JobSeekerAggregate;
using ApplicationCore.Entities.EmployerAggregate;
using ApplicationCore.Specifications;

namespace PublicApi.JobApplicationEndpoints;

public class GetAllJobApplicationsEndpoint :
    IEndpoint<IResult, GetAllJobApplicationsRequest,
    (IRepository<JobApplication> jobAppRepo, IRepository<JobSeeker> jobSeekerRepo, IRepository<Employer> employerRepo)>
{
    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapGet("api/job-applications",
                async (IRepository<JobApplication> jobAppRepo,
                        IRepository<JobSeeker> jobSeekerRepo,
                        IRepository<Employer> employerRepo) =>
                {
                    var request = new GetAllJobApplicationsRequest();
                    return await HandleAsync(request, (jobAppRepo, jobSeekerRepo, employerRepo));
                })
            .WithName("GetAllJobApplications")
            .WithDescription("Gets all job applications including JobSeeker and Employer data")
            .Produces<GetAllJobApplicationsResponse>(StatusCodes.Status200OK)
            .WithTags("Job Application Endpoints");
    }

    public async Task<IResult> HandleAsync(GetAllJobApplicationsRequest request,
        (IRepository<JobApplication> jobAppRepo, IRepository<JobSeeker> jobSeekerRepo, IRepository<Employer> employerRepo) repos)
    {
        var (jobAppRepo, jobSeekerRepo, employerRepo) = repos;
        var response = new GetAllJobApplicationsResponse(request.CorrelationId());

        var jobApplications = await jobAppRepo.ListAsync();

        var jobSeekerIds = jobApplications.Select(a => a.JobSeekerId).Distinct().ToList();
        var employerIds = jobApplications.Select(a => a.EmployerId).Distinct().ToList();
        var seekerSpec = new GetJobApplicationByJobSeekerIdSpec(jobSeekerIds);
        var employerSpec = new GetJobApplicationsByEmployerIdsSpec(employerIds);
        var jobSeekers = await jobSeekerRepo.ListAsync(seekerSpec);
        var employers = await employerRepo.ListAsync(employerSpec);

        response.JobApplications = jobApplications.Select(app =>
        {
            var jobSeeker = jobSeekers.FirstOrDefault(js => js.Id == app.JobSeekerId);
            var employer = employers.FirstOrDefault(e => e.Id == app.EmployerId);

            return new JobApplicationReadDto
            {
                Id = app.Id,
                JobId = app.JobId,
                JobSeekerId = app.JobSeekerId,
                JobSeeker = jobSeeker,
                EmployerId = app.EmployerId,
                Employer = employer,
                CoverLetter = app.CoverLetter,
                Status = app.Status,
                InterviewScheduledDate = app.InterviewScheduledDate,
                InterviewNotes = app.InterviewNotes,
                EmployerFeedback = app.EmployerFeedback,
                CreatedAt = app.CreatedAt,
                UpdatedAt = app.UpdatedAt
            };
        }).ToList();

        return Results.Ok(response);
    }
}

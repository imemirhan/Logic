using ApplicationCore.Entities.JobSeekerAggregate;
using ApplicationCore.Interfaces;
using Ardalis.GuardClauses;
using Ardalis.Result;

namespace ApplicationCore.Services;

public class JobSeekerService : IJobSeekerService
{
    IRepository<JobSeeker> _jobSeekerRepository;
    IAppLogger<JobSeekerService> _logger;


    public JobSeekerService(IRepository<JobSeeker> jobSeekerRepository, IAppLogger<JobSeekerService> logger)
    {
        _jobSeekerRepository = jobSeekerRepository;
        _logger = logger;
    }

    public async Task<Result<JobSeeker>> CreateJobSeekerAsync(JobSeeker jobSeeker)
    {
        Guard.Against.Null(jobSeeker, nameof(jobSeeker));
        await _jobSeekerRepository.AddAsync(jobSeeker);
        _logger.LogInformation($"Successfully created a new job seeker for {jobSeeker.Id}");
        return Result.Success(jobSeeker);
    }

    public async Task<Result<JobSeeker>> GetJobSeekerByIdAsync(int id)
    {
        var jobSeeker = await _jobSeekerRepository.GetByIdAsync(id);
        Guard.Against.Null(jobSeeker, nameof(jobSeeker));
        _logger.LogInformation($"Successfully retrieved a job seeker for {id}");
        return Result.Success(jobSeeker);
    }

    public async Task<Result> UpdateJobSeekerAsync(JobSeeker jobSeeker)
    {
        var existingJob = await _jobSeekerRepository.GetByIdAsync(jobSeeker.Id);
        Guard.Against.Null(existingJob, nameof(existingJob));
        await _jobSeekerRepository.UpdateAsync(jobSeeker);
        _logger.LogInformation($"Job '{jobSeeker.Id}' updated successfully.");
        return Result.Success();
    }

    public async Task<Result> DeleteJobSeekerAsync(int id)
    {
        var existingJob = await _jobSeekerRepository.GetByIdAsync(id);
        Guard.Against.Null(existingJob, nameof(existingJob));
        await _jobSeekerRepository.DeleteAsync(existingJob);
        _logger.LogInformation($"Job '{existingJob.Id}' deleted successfully.");
        return Result.Success();
    }
    
    
}
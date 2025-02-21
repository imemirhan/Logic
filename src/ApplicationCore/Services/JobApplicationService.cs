using ApplicationCore.Entities.JobAggregate;
using ApplicationCore.Interfaces;
using Ardalis.GuardClauses;
using Ardalis.Result;

namespace ApplicationCore.Services;

public class JobApplicationService : IJobApplicationService
{
    IRepository<JobApplication> _jobApplicationRepository;
    IAppLogger<JobApplicationService> _logger;

    public JobApplicationService(IRepository<JobApplication> jobApplicationRepository, IAppLogger<JobApplicationService> logger)
    {
        _jobApplicationRepository = jobApplicationRepository;
        _logger = logger;
    }

    public async Task<Result<JobApplication>> CreateJobApplicationAsync(JobApplication jobApplication)
    {
        Guard.Against.Null(jobApplication, nameof(jobApplication));
        await _jobApplicationRepository.AddAsync(jobApplication);
        _logger.LogInformation($"Job Application {jobApplication.Id} has been created");
        return Result.Success(jobApplication);
    }

    public async Task<Result<JobApplication>> GetJobApplicationByIdAsync(int id)
    {
        var jobApplication = await _jobApplicationRepository.GetByIdAsync(id);
        Guard.Against.Null(jobApplication, nameof(jobApplication));
        _logger.LogInformation($"Job Application {jobApplication.Id} has been retrieved");
        return Result.Success(jobApplication);
    }

    public async Task<Result> UpdateJobApplicationAsync(JobApplication jobApplication)
    {
        var existingApplication = await _jobApplicationRepository.GetByIdAsync(jobApplication.Id);
        Guard.Against.Null(existingApplication, nameof(existingApplication));
        await _jobApplicationRepository.UpdateAsync(jobApplication);
        _logger.LogInformation($"Job Application {jobApplication.Id} has been updated");
        return Result.Success();
    }

    public async Task<Result> DeleteJobApplicationAsync(int id)
    {
        var existingApplication = await _jobApplicationRepository.GetByIdAsync(id);
        Guard.Against.Null(existingApplication, nameof(existingApplication));
        await _jobApplicationRepository.DeleteAsync(existingApplication);
        _logger.LogInformation($"Job Application {existingApplication.Id} has been deleted");
        return Result.Success();
    }
}
using ApplicationCore.Entities.JobAggregate;
using ApplicationCore.Interfaces;
using ApplicationCore.Specifications;
using Ardalis.GuardClauses;
using Ardalis.Result;

namespace ApplicationCore.Services;

public class JobService : IJobService
{
    private readonly IRepository<Job> _jobRepository;
    private readonly IAppLogger<JobService> _logger;

    public JobService(IRepository<Job> jobRepository, IAppLogger<JobService> logger)
    {
        _jobRepository = jobRepository;
        _logger = logger;
    }

    public async Task<Result<Job>> CreateJobAsync(Job job)
    {
        Guard.Against.Null(job, nameof(job));

        await _jobRepository.AddAsync(job);
        _logger.LogInformation($"Job '{job.Title}' created successfully.");
        return Result.Success(job);
    }

    public async Task<Result<Job>> GetJobByIdAsync(int jobId)
    {
        var job = await _jobRepository.GetByIdAsync(jobId);
        Guard.Against.Null(job, nameof(job));
        return Result.Success(job);
    }
    
    public async Task<Result<List<Job>>> GetJobListByEmployerIdAsync(int employerId)
    {
        var jobSpecification = new GetJobByIdSpecification(employerId);
        var job = await _jobRepository.ListAsync(jobSpecification);
        Guard.Against.Null(job, nameof(job));
        return Result.Success(job);
    }

    public async Task<Result<List<Job>>> GetJobListByEmploymentCategoryAsync(EmploymentType eType)
    {
        var employmentSpecification = new GetJobByEmploymentTypeSpecification(eType);
        var job = await _jobRepository.ListAsync(employmentSpecification);
        Guard.Against.Null(job, nameof(job));
        return Result.Success(job);
    }

    public async Task<Result> UpdateJobAsync(Job job)
    {
        var existingJob = await _jobRepository.GetByIdAsync(job.Id);
        Guard.Against.Null(existingJob, nameof(existingJob));
        await _jobRepository.UpdateAsync(job);

        _logger.LogInformation($"Job '{job.Title}' updated successfully.");

        return Result.Success();
    }

    public async Task<Result> DeleteJobAsync(int jobId)
    {
        var job = await _jobRepository.GetByIdAsync(jobId);
        Guard.Against.Null(job, nameof(job));

        await _jobRepository.DeleteAsync(job);
        _logger.LogInformation($"Job ID '{jobId}' deleted successfully.");

        return Result.Success();
    }
}
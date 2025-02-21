using ApplicationCore.Entities.JobAggregate;
using Ardalis.Result;

namespace ApplicationCore.Interfaces;

public interface IJobApplicationService
{
    Task<Result<JobApplication>> CreateJobApplicationAsync(JobApplication jobApplication);
    Task<Result<JobApplication>> GetJobApplicationByIdAsync(int id);
    Task<Result> UpdateJobApplicationAsync(JobApplication jobApplication);
    Task<Result> DeleteJobApplicationAsync(int id);
}
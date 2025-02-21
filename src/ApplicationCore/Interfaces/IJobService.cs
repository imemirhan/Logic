using ApplicationCore.Entities.JobAggregate;
using Ardalis.Result;

namespace ApplicationCore.Interfaces;

public interface IJobService
{   
    Task<Result<Job>> CreateJobAsync(Job job);
    Task<Result<Job>> GetJobByIdAsync(int jobId);
    Task<Result<List<Job>>> GetJobListByEmployerIdAsync(int employerId);
    Task<Result<List<Job>>> GetJobListByEmploymentCategoryAsync(EmploymentType eType);
    Task<Result> UpdateJobAsync(Job job);
    Task<Result> DeleteJobAsync(int jobId);
}
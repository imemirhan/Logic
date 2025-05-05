using ApplicationCore.Entities.JobSeekerAggregate;
using Ardalis.Result;

namespace ApplicationCore.Interfaces;

public interface IJobSeekerService
{
    Task<Result<JobSeeker>> CreateJobSeekerAsync(JobSeeker jobSeeker);
    Task<Result<JobSeeker>> GetJobSeekerByIdAsync(int id);
    Task<Result<JobSeeker>> GetJobSeekerByIdentityGuidAsync(string identityGuid);
    Task<Result> UpdateJobSeekerAsync(JobSeeker jobSeeker);
    Task<Result> DeleteJobSeekerAsync(int id);
}
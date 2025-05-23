using ApplicationCore.Entities.JobAggregate;
using Ardalis.Specification;

namespace ApplicationCore.Specifications;

public sealed class JobApplicationsByJobIdSpec : Specification<JobApplication>
{
    public JobApplicationsByJobIdSpec(int jobId)
    {
        Query.Where(app => app.JobId == jobId)
            .Include(app => app.JobSeeker)
            .Include(app => app.JobSeeker.Skills)
            .Include(app => app.JobSeeker.Experiences)
            .Include(app => app.JobSeeker.Educations)
            .Include(app => app.Employer);
    }
}
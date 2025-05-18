using ApplicationCore.Entities.JobAggregate;
using Ardalis.Specification;

namespace ApplicationCore.Specifications;

public sealed class JobApplicationsByJobSeekerIdSpec : Specification<JobApplication>
{
    public JobApplicationsByJobSeekerIdSpec(int jobSeekerId)
    {
        Query.Where(app => app.JobSeekerId == jobSeekerId)
            .Include(app => app.JobSeeker)
            .Include(app => app.Employer);
    }
}
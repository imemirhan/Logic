using ApplicationCore.Entities.JobAggregate;
using Ardalis.Specification;

namespace ApplicationCore.Specifications;

public sealed class JobApplicationsByEmployerIdSpec : Specification<JobApplication>
{
    public JobApplicationsByEmployerIdSpec(int employerId)
    {
        Query
            .Where(app => app.EmployerId == employerId)
            .Include(app => app.JobSeeker)
            .Include(app => app.Employer);
    }
}
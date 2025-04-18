using ApplicationCore.Entities.JobAggregate;
using Ardalis.Specification;

namespace ApplicationCore.Specifications;

public sealed class JobApplicationsByJobIdSpec : Specification<JobApplication>
{
    public JobApplicationsByJobIdSpec(int jobId)
    {
        Query.Where(app => app.JobId == jobId);
    }
}
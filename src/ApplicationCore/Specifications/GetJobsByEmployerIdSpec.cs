using ApplicationCore.Entities.EmployerAggregate;
using ApplicationCore.Entities.JobAggregate;
using Ardalis.Specification;

namespace ApplicationCore.Specifications;

public sealed class GetJobsByEmployerIdSpec : Specification<Job>
{
    public GetJobsByEmployerIdSpec(int employerId)
    {
        Query
            .Where(job => job.EmployerId == employerId)
            .OrderByDescending(job => job.CreatedAt);
    }
}
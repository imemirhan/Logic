using ApplicationCore.Entities.JobAggregate;
using Ardalis.Specification;

namespace ApplicationCore.Specifications;

public sealed class GetJobByIdSpecification : Specification<Job>
{
    public GetJobByIdSpecification(int employerId)
    {
        Query.Where(c => c.EmployerId == employerId && c.Status == JobStatus.Open);
    }
}
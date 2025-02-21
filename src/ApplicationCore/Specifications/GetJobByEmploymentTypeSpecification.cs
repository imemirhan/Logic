using ApplicationCore.Entities.JobAggregate;
using Ardalis.Specification;

namespace ApplicationCore.Specifications;

public sealed class GetJobByEmploymentTypeSpecification : Specification<Job>
{
    public GetJobByEmploymentTypeSpecification(EmploymentType eType)
    {
        Query.Where(job => job.EType == eType );
    }
}
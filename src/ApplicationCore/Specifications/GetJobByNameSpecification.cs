using ApplicationCore.Entities.JobAggregate;
using Ardalis.Specification;

namespace ApplicationCore.Specifications;

public sealed class GetJobByNameSpecification : Specification<Job>
{
    public GetJobByNameSpecification(string name)
    {
        Query.Where(j => j.Title.ToLower().Contains(name.ToLower()));
    }
}
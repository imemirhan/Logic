using ApplicationCore.Entities.JobAggregate;
using Ardalis.Specification;

namespace ApplicationCore.Specifications;

public sealed class GetRecommendedJobsById : Specification<Job>
{
    public GetRecommendedJobsById(IReadOnlyCollection<int> jobIds)
    {
        Query.Where(job => jobIds.Contains(job.Id));
    }
}
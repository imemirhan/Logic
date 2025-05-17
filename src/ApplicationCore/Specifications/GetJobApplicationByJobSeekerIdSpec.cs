using ApplicationCore.Entities.JobAggregate;
using ApplicationCore.Entities.JobSeekerAggregate;
using Ardalis.Specification;

namespace ApplicationCore.Specifications;

public sealed class GetJobApplicationByJobSeekerIdSpec : Specification<JobSeeker>
{
    public GetJobApplicationByJobSeekerIdSpec(List<int> jobSeekerIds)
    {
        Query.Where(jobSeeker => jobSeekerIds.Contains(jobSeeker.Id));
    }
}
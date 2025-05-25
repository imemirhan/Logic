using ApplicationCore.Entities.JobSeekerAggregate;
using Ardalis.Specification;

namespace ApplicationCore.Specifications;

public sealed class GetJobSeekerByIdentityGuidSpec : Specification<JobSeeker>
{
    public GetJobSeekerByIdentityGuidSpec(string identityGuid)
    {
        Query.Where(e => e.IdentityGuid == identityGuid)
            .Include(e => e.Skills)
            .Include(e => e.Experiences)
            .Include(e => e.Educations);
    }
}
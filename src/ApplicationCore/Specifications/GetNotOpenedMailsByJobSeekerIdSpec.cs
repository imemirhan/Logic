using ApplicationCore.Entities.JobSeekerAggregate;
using Ardalis.Specification;

namespace ApplicationCore.Specifications;

public sealed class GetNotOpenedMailsByJobSeekerIdSpec : Specification<JobSeekerNotifications>
{
    public GetNotOpenedMailsByJobSeekerIdSpec(int jobSeekerId)
    {
        Query.Where(n => n.JobSeekerId == jobSeekerId && !n.IsOpened)
            .Include(n => n.JobSeeker)
            .Include(n => n.Employer)
            .Include(n => n.Job);
    }
}
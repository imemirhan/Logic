using Ardalis.Specification;
using ApplicationCore.Entities.JobSeekerAggregate;

namespace ApplicationCore.Specifications;

public sealed class GetNotificationsByJobSeekerIdSpec : Specification<JobSeekerNotifications>
{
    public GetNotificationsByJobSeekerIdSpec(int jobSeekerId)
    {
        Query.Where(n => n.JobSeekerId == jobSeekerId)
            .Include(n => n.JobSeeker)
            .Include(n => n.Employer)
            .Include(n => n.Job);
    }
}
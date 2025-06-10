using ApplicationCore.Entities.InterviewAggregate;
using ApplicationCore.Interfaces;
using Ardalis.Specification;

namespace ApplicationCore.Specifications;

public sealed class InterviewsByJobSeekerSpec : Specification<Interviews>
{
    public InterviewsByJobSeekerSpec(int jobSeekerId)
    {
        Query.Where(i => i.JobSeekerId == jobSeekerId)
            .OrderByDescending(i => i.InterviewScheduledDate);
    }
}
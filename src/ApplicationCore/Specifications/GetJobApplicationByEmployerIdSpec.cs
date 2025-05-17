using ApplicationCore.Entities.JobAggregate;
using Ardalis.Specification;
using System.Collections.Generic;
using ApplicationCore.Entities.EmployerAggregate;

namespace ApplicationCore.Specifications;

public sealed class GetJobApplicationsByEmployerIdsSpec : Specification<Employer>
{
    public GetJobApplicationsByEmployerIdsSpec(List<int> employerIds)
    {
        Query.Where(employer => employerIds.Contains(employer.Id));
    }
}
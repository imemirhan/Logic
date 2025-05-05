using ApplicationCore.Entities.EmployerAggregate;
using Ardalis.Specification;

namespace ApplicationCore.Specifications;

public sealed class GetEmployerByIdentityGuidSpec : Specification<Employer>
{
    public GetEmployerByIdentityGuidSpec(string identityGuid)
    {
        Query.Where(e => e.IdentityGuid == identityGuid);
    }
}
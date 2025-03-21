using ApplicationCore.Entities.JobSeekerAggregate;

namespace PublicApi.JobSeekerEndpoints.SkillsEndpoint
{
    public class AddSkillByIdRequest : BaseRequest
    {
        public int JobSeekerId { get; init; }
        public string Title { get; init; }
        public string Description { get; init; }
        public SkillType SkillType { get; init; }

        public AddSkillByIdRequest(int jobSeekerId, string title, string description, SkillType skillType)
        {
            JobSeekerId = jobSeekerId;
            Title = title;
            Description = description;
            SkillType = skillType;
        }
    }
}
using System.Runtime.CompilerServices;
using ApplicationCore.Entities.JobSeekerAggregate;
using PublicApi;

namespace PublicApi.JobSeekerEndpoints.SkillsEndpoint;
public class AddSkillByIdRequest : BaseRequest
{
    //TODO => Skill endpoint apiden çalışıyor ama fronttan çalışmıyor. Fixlenebilir mi ?
    public int JobSeekerId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public SkillType SkillType { get; set; }

    public AddSkillByIdRequest() {} // Needed for model binding

    public AddSkillByIdRequest(int jobSeekerId, string title, string description, SkillType skillType)
    {
        JobSeekerId = jobSeekerId;
        Title = title;
        Description = description;
        SkillType = skillType;
    }
}
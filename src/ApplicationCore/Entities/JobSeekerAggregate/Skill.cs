using ApplicationCore.Interfaces;
using Ardalis.GuardClauses;

namespace ApplicationCore.Entities.JobSeekerAggregate;

public class Skill : BaseEntity, IAggregateRoot
{
    public string Title { get; set; }

    public string  Description { get; set; }

    public SkillType SkillType { get; set; }

    public int JobSeekerId { get; private set; }
    
    public Skill(string title, string description, SkillType skillType, int jobSeekerId)
    {
        Guard.Against.NullOrEmpty(title, nameof(title));
        Guard.Against.NullOrEmpty(description, nameof(description));
        Guard.Against.Null(skillType, nameof(skillType));
        Guard.Against.Null(jobSeekerId, nameof(jobSeekerId));
        
        Title = title;
        Description = description;
        SkillType = skillType;
        JobSeekerId = jobSeekerId;
    }
    
    #pragma warning disable CS8618
    private Skill() { }
}

public enum SkillType
{
    Intermediate,
    Average,
    Beginner
}
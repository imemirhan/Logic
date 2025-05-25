using System.Reflection.Metadata.Ecma335;
using System.Runtime.InteropServices.JavaScript;
using ApplicationCore.Interfaces;
using Ardalis.GuardClauses;

namespace ApplicationCore.Entities.JobSeekerAggregate;

public class JobSeeker : BaseEntity, IAggregateRoot
{
    public string IdentityGuid { get; set; }
    public string Name { get; private set; }
    public string LastName { get; private set; }
    public string? ResumeUrl { get; private set; }
    public string? AboutMe { get; private set; }
    public string? ProfileImageUrl { get; private set; }
    public string? PreferredLocation { get; private set; }
    public bool OpenToRemote { get; private set; }
    public string? Tags { get; set; }
    public string? LinkedIn { get; private set; }
    public string? GitHub { get; private set; }
    public string? Twitter { get; private set; }
    public string? Facebook { get; private set; }
    public string? Instagram { get; private set; }
    
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    
    private readonly List<Skill> _skills = new();
    public IReadOnlyCollection<Skill> Skills => _skills.AsReadOnly();

    private readonly List<Experience> _experiences = new();
    public IReadOnlyCollection<Experience> Experiences => _experiences.AsReadOnly();

    private readonly List<Education> _educations = new();
    public IReadOnlyCollection<Education> Educations => _educations.AsReadOnly();


#pragma warning disable CS8618
    private JobSeeker() { }

    public JobSeeker(DateTime createdAt,
                     string identity,
                     string name,
                     string lastName,
                     bool openToRemote = false,
                     string? tags = null,
                     string? aboutMe = null,
                     string? profileImageUrl = null,
                     string? preferredLocation = null,
                     string? linkedIn = null,
                     string? gitHub = null, string? twitter = null,
                     string? facebook = null, string? instagram = null)
    {
        Guard.Against.NullOrEmpty(identity, nameof(identity));
        Guard.Against.NullOrEmpty(name, nameof(name));
        Guard.Against.NullOrEmpty(lastName, nameof(lastName));

        IdentityGuid = identity;
        Name = name;
        LastName = lastName;
        AboutMe = aboutMe;
        OpenToRemote = openToRemote;
        ProfileImageUrl = profileImageUrl;
        PreferredLocation = preferredLocation;
        Tags = tags;
        LinkedIn = linkedIn;
        GitHub = gitHub;
        Twitter = twitter;
        Facebook = facebook;
        Instagram = instagram;
        CreatedAt = createdAt;
    }

    public void UpdateInfo(string name,
                           string lastName,
                           bool openToRemote,
                           DateTime updatedAt,
                           string? aboutMe = null,
                           string? preferredLocation = null,
                           string? tags = null)
    {
        Guard.Against.NullOrEmpty(name, nameof(name));
        Guard.Against.NullOrEmpty(lastName, nameof(lastName));

        Name = name;
        LastName = lastName;
        OpenToRemote = openToRemote;
        Tags = tags ?? Tags;
        AboutMe = aboutMe ?? AboutMe;
        UpdatedAt = updatedAt;
        PreferredLocation = preferredLocation;
    }

    public void UpdateContactInfo(DateTime updatedAt,string? linkedIn = null, 
                                  string? gitHub = null, string? twitter = null, 
                                  string? facebook = null, string? instagram = null)
    {
        LinkedIn = linkedIn ?? LinkedIn;
        GitHub = gitHub ?? GitHub;
        Twitter = twitter ?? Twitter;
        Facebook = facebook ?? Facebook;
        Instagram = instagram ?? Instagram;
        UpdatedAt = updatedAt;
    }

    public void UpdateProfileImage(string profileImageUrl)
    {
        Guard.Against.NullOrEmpty(profileImageUrl, nameof(profileImageUrl));
        ProfileImageUrl = profileImageUrl;
        UpdatedAt = DateTime.UtcNow;
    }

    public void DeleteProfileImage()
    {
        ProfileImageUrl = null;
    }

    public void AddResume(string resumeUrl)
    {
        Guard.Against.NullOrEmpty(resumeUrl, nameof(resumeUrl));
        ResumeUrl = resumeUrl;
        UpdatedAt = DateTime.UtcNow;
    }

    public void DeleteResume()
    {
        ResumeUrl = null;
    }
    
    public void AddSkill(Skill skill)
    {
        Guard.Against.Null(skill, nameof(skill));
        _skills.Add(skill);
    }

    public void AddSkills(List<Skill> skills)
    {
        Guard.Against.Null(skills, nameof(skills));
        foreach (var skill in skills)
        {
            _skills.Add(skill);
        }
    }
    public void RemoveSkill(int skillId)
    {
        var skill = _skills.FirstOrDefault(s => s.Id == skillId);
        if (skill != null) _skills.Remove(skill);
    }

    public void AddExperience(Experience experience)
    {
        Guard.Against.Null(experience, nameof(experience));
        _experiences.Add(experience);
    }

    public void AddExperiences(List<Experience> experiences)
    {
        Guard.Against.Null(experiences, nameof(experiences));
        foreach (var experience in experiences)
        {
           _experiences.Add(experience); 
        }
    }

    public void RemoveExperience(int experienceId)
    {
        var experience = _experiences.FirstOrDefault(e => e.Id == experienceId);
        if (experience != null) _experiences.Remove(experience);
    }

    public void AddEducation(Education education)
    {
        Guard.Against.Null(education, nameof(education));
        _educations.Add(education);
    }

    public void AddEducations(List<Education> educations)
    {
        Guard.Against.Null(educations, nameof(educations));
        foreach (var education in educations)
        {
            _educations.Add(education);
        }
    }

    public void RemoveEducation(Education education)
    {
        if (education != null) _educations.Remove(education);
    }
}
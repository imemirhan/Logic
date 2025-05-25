using ApplicationCore.Entities;
using System.Text.RegularExpressions;
using ApplicationCore.Entities.JobAggregate;
using ApplicationCore.Entities.JobSeekerAggregate;
using ApplicationCore.Interfaces;

namespace ApplicationCore.Services;

public class TagGeneratorService : ITagGeneratorService
{
    private static readonly HashSet<string> StopWords = new()
    {
        "the", "at", "and", "for", "to", "in", "a", "an", "of", "on", "with", "as", "by", "is", "are"
    };

    public string GenerateTagsForJob(Job job)
    {
        var sourceText = $"{job.Title} {job.Description}";
        return ConvertToTagString(ExtractKeywords(sourceText));
    }
    public string GenerateTagsForJobSeeker(JobSeeker jobSeeker)
    {
        var tags = new List<string>();

        // Skills
        if (jobSeeker.Skills != null)
            tags.AddRange(jobSeeker.Skills.Select(s => s.Title.ToLower()));
        
        // Experiences
        if (jobSeeker.Experiences != null)
        {
            tags.AddRange(jobSeeker.Experiences.Select(e => e.Title.ToLower()));
            tags.AddRange(jobSeeker.Experiences.Select(e => e.Company.ToLower()));
        }

        // Educations
        if (jobSeeker.Educations != null)
        {
            tags.AddRange(jobSeeker.Educations.Select(ed => ed.Degree.ToLower()));
            tags.AddRange(jobSeeker.Educations.Select(ed => ed.Institution.ToLower()));
        }

        // Preferred Location
        if (!string.IsNullOrWhiteSpace(jobSeeker.PreferredLocation))
            tags.Add(jobSeeker.PreferredLocation.ToLower());

        // Remote preference
        if (jobSeeker.OpenToRemote)
            tags.Add("remote");

        // Remove duplicates
        var distinctTags = tags.Distinct();

        // Join with your delimiter
        return string.Join(";", distinctTags);
    }


    private List<string> ExtractKeywords(string text)
    {
        if (string.IsNullOrWhiteSpace(text)) return new();

        var words = Regex.Split(text.ToLower(), @"\W+")
            .Where(w => !StopWords.Contains(w) && w.Length > 2)
            .Distinct()
            .ToList();

        return words;
    }
    
    private string ConvertToTagString(List<string> keywords)
    {
        return string.Join(";", keywords.Distinct());
    }

}
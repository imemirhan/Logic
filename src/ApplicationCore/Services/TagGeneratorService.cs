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
        "the", "at", "and", "for", "to", "in", "a", "an", "of", "on", "with", "as", "by", "is", "are",
        "be", "been", "was", "were", "this", "that", "these", "those", "it", "its", "but", "or",
        "so", "because", "about", "from", "into", "up", "down", "over", "under", "again", "further",
        "then", "once", "here", "there", "when", "where", "why", "how", "all", "any", "both", "each",
        "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same",
        "than", "too", "very", "can", "will", "just", "don't", "should", "now", "who", "want", "good",
        "wants"
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
            tags.AddRange(jobSeeker.Skills.SelectMany(s => ExtractKeywords(s.Title.ToLower())));

        // Experiences
        if (jobSeeker.Experiences != null)
        {
            tags.AddRange(jobSeeker.Experiences.SelectMany(e => ExtractKeywords(e.Title.ToLower())));
            tags.AddRange(jobSeeker.Experiences.SelectMany(e => ExtractKeywords(e.Company.ToLower())));
        }

        // About Me
        if (!string.IsNullOrWhiteSpace(jobSeeker.AboutMe))
            tags.AddRange(ExtractKeywords(jobSeeker.AboutMe.ToLower()));

        // Educations
        if (jobSeeker.Educations != null)
        {
            tags.AddRange(jobSeeker.Educations.SelectMany(ed => ExtractKeywords(ed.Degree.ToLower())));
            tags.AddRange(jobSeeker.Educations.SelectMany(ed => ExtractKeywords(ed.Institution.ToLower())));
        }

        // Preferred Location
        if (!string.IsNullOrWhiteSpace(jobSeeker.PreferredLocation))
            tags.Add(jobSeeker.PreferredLocation.ToLower());

        // Remote preference
        if (jobSeeker.OpenToRemote)
            tags.Add("remote");

        // Remove duplicates and return as a single semicolon-delimited string
        return string.Join(";", tags
            .Where(t => !string.IsNullOrWhiteSpace(t))
            .Select(t => t.Trim())
            .Distinct());
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
using ApplicationCore.Entities.JobAggregate;
using ApplicationCore.Entities.JobSeekerAggregate;
using ApplicationCore.Interfaces;
using Microsoft.Extensions.Logging;

namespace ApplicationCore.Services;
public class JobRecommendationService : IJobRecommendationService
{
    private readonly IRepository<Job> _jobRepository;
    private readonly IRepository<JobSeeker> _jobSeekerRepository;
    private readonly ITagGeneratorService _tagGeneratorService;
    private readonly ILogger<JobRecommendationService> _logger;

    // Scoring weights - tweak as you want
    private const int TagMatchPoints = 5;
    private const int LocationMatchPoints = 10;
    private const int RemoteMatchPoints = 7;

    public JobRecommendationService(
        IRepository<Job> jobRepository,
        IRepository<JobSeeker> jobSeekerRepository,
        ITagGeneratorService tagGeneratorService,
        ILogger<JobRecommendationService> logger)
    {
        _jobRepository = jobRepository;
        _jobSeekerRepository = jobSeekerRepository;
        _tagGeneratorService = tagGeneratorService;
        _logger = logger;
    }

    public async Task<IReadOnlyList<int>> GetRecommendedJobIdsAsync(int jobSeekerId, int maxResults = 10)
    {
        var jobSeeker = await _jobSeekerRepository.GetByIdAsync(jobSeekerId);
        if (jobSeeker == null)
        {
            _logger.LogWarning($"Job seeker with ID {jobSeekerId} not found.");
            return Array.Empty<int>();
        }

        if (string.IsNullOrEmpty(jobSeeker.Tags))
        {
            jobSeeker.Tags = _tagGeneratorService.GenerateTagsForJobSeeker(jobSeeker);
        }

        var jobSeekerTags = ParseTags(jobSeeker.Tags);
        var preferredLocation = jobSeeker.PreferredLocation?.Trim().ToLowerInvariant();
        var openToRemote = jobSeeker.OpenToRemote;

        var allJobs = await _jobRepository.ListAsync();
        var validJobs = allJobs.Where(j => j.ExpirationDate > DateTime.UtcNow).ToList();

        var scoredJobs = new List<(Job job, int score)>();

        foreach (var job in validJobs)
        {
            if (string.IsNullOrEmpty(job.Tags))
            {
                job.Tags = _tagGeneratorService.GenerateTagsForJob(job);
            }

            var jobTags = ParseTags(job.Tags);

            int score = 0;
            score += jobTags.Intersect(jobSeekerTags).Count() * TagMatchPoints;

            if (!string.IsNullOrEmpty(preferredLocation) && !string.IsNullOrEmpty(job.Location))
            {
                if (job.Location.Trim().ToLowerInvariant() == preferredLocation)
                {
                    score += LocationMatchPoints;
                }
            }

            if (openToRemote && job.IsRemote)
            {
                score += RemoteMatchPoints;
            }

            if (score > 5)
            {
                scoredJobs.Add((job, score));
            }
        }

        var recommendedJobIds = scoredJobs
            .OrderByDescending(js => js.score)
            .Take(maxResults)
            .Select(js => js.job.Id)
            .ToList();

        return recommendedJobIds;
    }


    private static HashSet<string> ParseTags(string tags)
    {
        if (string.IsNullOrWhiteSpace(tags))
            return new HashSet<string>();

        return new HashSet<string>(
            tags.Split(';', StringSplitOptions.RemoveEmptyEntries)
                .Select(t => t.Trim().ToLowerInvariant())
        );
    }
}

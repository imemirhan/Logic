using ApplicationCore.Entities.JobAggregate;
using ApplicationCore.Entities.JobSeekerAggregate;

namespace ApplicationCore.Interfaces;

public interface ITagGeneratorService
{
    string GenerateTagsForJob(Job job);
    string GenerateTagsForJobSeeker(JobSeeker jobSeeker);

}

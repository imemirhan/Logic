using ApplicationCore.Entities.JobAggregate;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApplicationCore.Interfaces
{
    public interface IJobRecommendationService
    {
        /// <summary>
        /// Returns a list of recommended job IDs for the given job seeker ID.
        /// </summary>
        /// <param name="jobSeekerId">The ID of the job seeker.</param>
        /// <param name="maxResults">Optional maximum number of recommended jobs to return.</param>
        /// <returns>A list of recommended job IDs.</returns>
        Task<IReadOnlyList<int>> GetRecommendedJobIdsAsync(int jobSeekerId, int maxResults = 10);
    }
}
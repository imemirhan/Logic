using ApplicationCore.Entities.EmployerAggregate;
using ApplicationCore.Entities.JobAggregate;
using ApplicationCore.Entities.JobSeekerAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data;

public class AppDbContextSeed
{
    public static async Task SeedAsync(AppDbContext context,
        ILogger logger,
        int retry = 0)
    {
        var retryForAvailability = retry;
        try
        {
            if (context.Database.IsNpgsql())
            {
                context.Database.Migrate();
            }

            if (!await context.Jobs.AnyAsync())
            {
                await context.Jobs.AddRangeAsync(GetPreconfiguredJobs());

                await context.SaveChangesAsync();
            }

            if (!await context.JobSeekers.AnyAsync())
            {
                await context.JobSeekers.AddRangeAsync(GetPreconfiguredJobSeekers());

                await context.SaveChangesAsync();
            }

            if (!await context.JobApplications.AnyAsync())
            {
                await context.JobApplications.AddRangeAsync(GetPreconfiguredJobApplications());

                await context.SaveChangesAsync();
            }
            
            
            if (!await context.Employers.AnyAsync())
            {
                await context.Employers.AddRangeAsync(GetPreconfiguredEmployers());

                await context.SaveChangesAsync();
            }
            
        }
        catch (Exception ex)
        {
            if (retryForAvailability >= 10) throw;

            retryForAvailability++;
            
            logger.LogError(ex.Message);
            await SeedAsync(context, logger, retryForAvailability);
            throw;
        }
    }

    static IEnumerable<Job> GetPreconfiguredJobs()
    {
        return new List<Job>();
    }

    static IEnumerable<JobApplication> GetPreconfiguredJobApplications()
    {
        return new List<JobApplication>();
    }

    static IEnumerable<JobSeeker> GetPreconfiguredJobSeekers()
    {
        return new List<JobSeeker>();
    }
    
    static IEnumerable<Employer> GetPreconfiguredEmployers()
    {
        return new List<Employer>();
    }
}
using System.Reflection;
using ApplicationCore.Entities;
using ApplicationCore.Entities.EmployerAggregate;
using ApplicationCore.Entities.FeedbackAggregate;
using ApplicationCore.Entities.InterviewAggregate;
using ApplicationCore.Entities.JobAggregate;
using ApplicationCore.Entities.JobSeekerAggregate;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class AppDbContext : DbContext
{
    #pragma warning disable CS8618 // Required by Entity Framework
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}
    
    public DbSet<Job> Jobs { get; set; }
    public DbSet<JobApplication> JobApplications { get; set; }
    public DbSet<Employer> Employers { get; set; }
    public DbSet<JobSeeker> JobSeekers { get; set; }
    public DbSet<Skill> Skills { get; set; }
    public DbSet<Education> Educations { get; set; }
    public DbSet<Experience> Experiences { get; set; }
    public DbSet<Interviews> Interviews { get; set; }
    public DbSet<JobSeekerNotifications> JobSeekerNotifications { get; set; }
    public DbSet<Feedback> Feedbacks { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }
}
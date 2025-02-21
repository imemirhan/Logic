using ApplicationCore.Entities.EmployerAggregate;
using ApplicationCore.Interfaces;
using ApplicationCore.Specifications;
using Ardalis.GuardClauses;
using Ardalis.Result;


namespace ApplicationCore.Services;

public class EmployerService : IEmployerService
{
    private readonly IRepository<Employer> _employerRepository;
    private readonly IAppLogger<EmployerService> _logger;

    public EmployerService(IRepository<Employer> employerRepository, IAppLogger<EmployerService> logger)
    {
        _employerRepository = employerRepository;
        _logger = logger;
    }

    public async Task<Result<Employer>> CreateEmployerAsync(Employer employer)
    {
        Guard.Against.Null(employer, nameof(employer));
        await _employerRepository.AddAsync(employer);
        _logger.LogInformation($"Job '{employer.Id}' created successfully.");
        return Result.Success(employer);
        
    }

    public async Task<Result<Employer>> GetEmployerByIdAsync(int id)
    {
        var employer = await _employerRepository.GetByIdAsync(id);
        Guard.Against.Null(employer, nameof(employer));
        _logger.LogInformation($"Job '{employer.Id}' is retrieved successfully.");
        return Result.Success(employer);
    }

    public async Task<Result> UpdateEmployerAsync(Employer employer)
    {
        var existingJob = await _employerRepository.GetByIdAsync(employer.Id);
        Guard.Against.Null(existingJob, nameof(existingJob));
        await _employerRepository.UpdateAsync(employer);
        _logger.LogInformation($"Job '{employer.Id}' updated successfully.");
        return Result.Success();
    }

    public async Task<Result> DeleteEmployerAsync(int id)
    {
        var employer = await _employerRepository.GetByIdAsync(id);
        Guard.Against.Null(employer, nameof(employer));
        await _employerRepository.DeleteAsync(employer);
        _logger.LogInformation($"Job '{employer.Id}' deleted successfully.");
        return Result.Success();
    }
}
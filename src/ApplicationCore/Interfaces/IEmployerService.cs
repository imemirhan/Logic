using ApplicationCore.Entities.EmployerAggregate;
using Ardalis.Result;

namespace ApplicationCore.Interfaces;

public interface IEmployerService
{
    Task<Result<Employer>> CreateEmployerAsync(Employer employer);
    Task<Result<Employer>> GetEmployerByIdAsync(int id);
    Task<Result> UpdateEmployerAsync(Employer employer);
    Task<Result> DeleteEmployerAsync(int id);
}
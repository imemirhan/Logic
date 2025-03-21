using ApplicationCore.Interfaces;
using Ardalis.Specification.EntityFrameworkCore;

namespace Infrastructure.Data;


public class EfRepository<T> : RepositoryBase<T>, IReadRepository<T>, IRepository<T> where T : class, IAggregateRoot
{
    private readonly AppDbContext _context;
    public EfRepository(AppDbContext dbContext) : base(dbContext)
    {
        _context = dbContext;
    }

    public IQueryable<T> GetAll()
    {
        return _context.Set<T>().AsQueryable();
    }
}

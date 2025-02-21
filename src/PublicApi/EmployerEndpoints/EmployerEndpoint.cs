using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Annotations;
using ApplicationCore.Entities;
using ApplicationCore.Services;
using ApplicationCore.Entities.EmployerAggregate;
using Infrastructure.Data;

namespace PublicApi.EmployerEndpoints
{
    /// <summary>
    /// Gets all employers
    /// </summary>
    [Route("api/employers")]
    public class GetAllEmployersEndpoint : EndpointBaseAsync
        .WithoutRequest
        .WithActionResult<IEnumerable<Employer>>
    {
        private readonly ISerVice _employerRepository;

        public GetAllEmployersEndpoint(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        [SwaggerOperation(
            Summary = "Gets all employers",
            Description = "Retrieves a list of all employers from the database",
            OperationId = "employer.getAll",
            Tags = new[] { "EmployerEndpoints" })
        ]
        public override async Task<ActionResult<IEnumerable<Employer>>> HandleAsync(CancellationToken cancellationToken = default)
        {
            var employers = await _dbContext.Employers.ToListAsync(cancellationToken);
            return Ok(employers);
        }
    }

    /// <summary>
    /// Gets an employer by ID
    /// </summary>
    [Route("api/employers")]
    public class GetEmployerByIdEndpoint : EndpointBaseAsync
        .WithRequest<int>
        .WithActionResult<Employer>
    {
        private readonly AppDbContext _dbContext;

        public GetEmployerByIdEndpoint(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("{id}")]
        [SwaggerOperation(
            Summary = "Gets employer by ID",
            Description = "Retrieves details of a specific employer",
            OperationId = "employer.getById",
            Tags = new[] { "EmployerEndpoints" })
        ]
        public override async Task<ActionResult<Employer>> HandleAsync(int id, CancellationToken cancellationToken = default)
        {
            return GetEmployerByIdAsync();
        }
    }

    /// <summary>
    /// Creates a new employer
    /// </summary>
    [Route("api/employers")]
    public class CreateEmployerEndpoint : EndpointBaseAsync
        .WithRequest<Employer>
        .WithActionResult
    {
        private readonly AppDbContext _dbContext;

        public CreateEmployerEndpoint(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPost]
        [SwaggerOperation(
            Summary = "Creates a new employer",
            Description = "Adds a new employer to the database",
            OperationId = "employer.create",
            Tags = new[] { "EmployerEndpoints" })
        ]
        public override async Task<ActionResult> HandleAsync(Employer employer, CancellationToken cancellationToken = default)
        {
            _dbContext.Employers.Add(employer);
            await _dbContext.SaveChangesAsync(cancellationToken);
            return CreatedAtAction(nameof(GetEmployerByIdEndpoint.HandleAsync), new { id = employer.Id }, employer);
        }
    }

    /// <summary>
    /// Updates an employer
    /// </summary>
    [Route("api/employers")]
    public class UpdateEmployerEndpoint : EndpointBaseAsync
        .WithRequest<(int id, Employer employerDto)>
        .WithActionResult
    {
        private readonly AppDbContext _dbContext;

        public UpdateEmployerEndpoint(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpPut("{id}")]
        [SwaggerOperation(
            Summary = "Updates an employer",
            Description = "Modifies details of an employer",
            OperationId = "employer.update",
            Tags = new[] { "EmployerEndpoints" })
        ]
        public override async Task<ActionResult> HandleAsync((int id, Employer employerDto) request, CancellationToken cancellationToken = default)
        {
            var existingEmployer = await _dbContext.Employers.FindAsync(new object[] { request.id }, cancellationToken);
            if (existingEmployer == null) return NotFound($"Employer with ID {request.id} not found.");

            // Update other fields as necessary...

            await _dbContext.SaveChangesAsync(cancellationToken);
            return NoContent();
        }
    }

    /// <summary>
    /// Deletes an employer
    /// </summary>
    [Route("api/employers")]
    public class DeleteEmployerEndpoint : EndpointBaseAsync
        .WithRequest<int>
        .WithActionResult
    {
        private readonly AppDbContext _dbContext;

        public DeleteEmployerEndpoint(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpDelete("{id}")]
        [SwaggerOperation(
            Summary = "Deletes an employer",
            Description = "Removes an employer from the database",
            OperationId = "employer.delete",
            Tags = new[] { "EmployerEndpoints" })
        ]
        public override async Task<ActionResult> HandleAsync(int id, CancellationToken cancellationToken = default)
        {
            var employer = await _dbContext.Employers.FindAsync(new object[] { id }, cancellationToken);
            if (employer == null) return NotFound($"Employer with ID {id} not found.");

            _dbContext.Employers.Remove(employer);
            await _dbContext.SaveChangesAsync(cancellationToken);
            return NoContent();
        }
    }
}

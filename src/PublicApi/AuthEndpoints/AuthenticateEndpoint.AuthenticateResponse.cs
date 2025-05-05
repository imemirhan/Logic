using System;
using ApplicationCore.Entities.EmployerAggregate;
using ApplicationCore.Entities.JobSeekerAggregate;
using ApplicationCore.Enums;

namespace PublicApi.AuthEndpoints;

public class AuthenticateResponse : BaseResponse
{
    public AuthenticateResponse(Guid correlationId) : base(correlationId)
    {
    }

    public AuthenticateResponse()
    {
    }
    public bool Result { get; set; } = false;
    public Guid Id { get; set; }
    public string Token { get; set; } = string.Empty;
    public string RefreshToken { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public bool IsLockedOut { get; set; } = false;
    public bool IsNotAllowed { get; set; } = false;
    public bool RequiresTwoFactor { get; set; } = false;
    public ProjectEnums.Role Role { get; set; }
    public JobSeeker JobSeeker { get; set; } = null;
    public Employer Employer { get; set; } = null;
}

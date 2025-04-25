namespace ApplicationCore.Interfaces;

public interface IRefreshTokenService
{
    Task<string> GenerateRefreshTokenAsync(string username);
}

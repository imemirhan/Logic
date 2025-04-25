using ApplicationCore.Interfaces;

namespace Infrastructure.Identity;

public class RefreshTokenService : IRefreshTokenService
{
    public Task<string> GenerateRefreshTokenAsync(string username)
    {
        // Simple GUID-based refresh token (this can be more complex if needed)
        var refreshToken = Guid.NewGuid().ToString();
        return Task.FromResult(refreshToken);
    }
}

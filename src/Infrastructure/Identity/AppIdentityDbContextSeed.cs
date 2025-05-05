using System.Threading.Tasks;
using ApplicationCore.Constants;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Identity;

public class AppIdentityDbContextSeed
{
    public static async Task SeedAsync(AppIdentityDbContext identityDbContext, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
    {

        if (identityDbContext.Database.IsNpgsql())
        {
            await identityDbContext.Database.MigrateAsync();
        }

        await roleManager.CreateAsync(new IdentityRole(Shared.Authorization.Constants.Roles.ADMINISTRATORS));
        await roleManager.CreateAsync(new IdentityRole(Shared.Authorization.Constants.Roles.USERS));
        await roleManager.CreateAsync(new IdentityRole(Shared.Authorization.Constants.Roles.EMPLOYER));
        await roleManager.CreateAsync(new IdentityRole(Shared.Authorization.Constants.Roles.JOBSEEKER));

        var defaultUser = new ApplicationUser { UserName = "demouser@microsoft.com", Email = "demouser@microsoft.com" };
        await userManager.CreateAsync(defaultUser, AuthorizationConstants.DEFAULT_PASSWORD);

        string adminUserName = "admin@microsoft.com";
        var adminUser = new ApplicationUser { UserName = adminUserName, Email = adminUserName };
        await userManager.CreateAsync(adminUser, AuthorizationConstants.DEFAULT_PASSWORD);
        adminUser = await userManager.FindByNameAsync(adminUserName);
        if (adminUser != null)
        {
            await userManager.AddToRoleAsync(adminUser, Shared.Authorization.Constants.Roles.ADMINISTRATORS);
        }
    }
}

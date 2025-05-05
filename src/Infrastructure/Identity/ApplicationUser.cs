using System.ComponentModel.DataAnnotations;
using ApplicationCore.Enums;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity;

public class ApplicationUser : IdentityUser
{
    [Required(ErrorMessage = "Required Parameter")]
    public string Name { get; set; }
    [Required(ErrorMessage = "Required Parameter")]
    public string Surname { get; set; }
    public ProjectEnums.Role Role { get; private set; }
    public string FullName => Name + " " + Surname;
    public DateTime Dateofbirth { get; set; }
    public bool IsDeleted { get; set; } = false;
    public long? IsDeletedById { get; set; }
    [StringLength(450)]
    public string RefreshTokenHash { get; set; }
    public DateTimeOffset? RefreshTokenExpiryTime { get; set; }
    public ProjectEnums.GenderEnum Gender { get; set; } = ProjectEnums.GenderEnum.Male;

}

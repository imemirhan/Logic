using System.ComponentModel.DataAnnotations;

namespace ApplicationCore.Enums;

public class ProjectEnums
{
    public enum GenderEnum
    {
        [Display(Name = "Male")]
        Male = 0,
        [Display(Name = "Female")]
        Female = 1,
        [Display(Name = "Don't prefer to say")]
        Notr = 2,
    }

    public enum Role
    {
        [Display(Name = "Job Seeker")]
        JobSeeker = 0,
        [Display(Name = "Employer")]
        Employer = 1,
        [Display(Name = "Admin")]
        Admin = 2,
    }
}
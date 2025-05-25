
namespace PublicApi.JobSeekerEndpoints.EducationsEndpoint;

public class AddEducationByIdRequest : BaseRequest
{
    public int JobSeekerId { get; set; }
    public string Degree { get; set; }
    public string Branch { get; set; }
    public string Institution { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime GraduationDate { get; set; }

    public AddEducationByIdRequest(int jobSeekerId, string degree, string branch, string institution, DateTime startDate, DateTime graduationDate)
    {
        JobSeekerId = jobSeekerId;
        Degree = degree;
        Branch = branch;    
        Institution = institution;
        StartDate = startDate;
        GraduationDate = graduationDate;
    }
}
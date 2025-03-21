namespace PublicApi.JobSeekerEndpoints.EducationsEndpoint;

public class AddEducationByIdRequest : BaseRequest
{
    public int JobSeekerId { get; set; }
    public string Degree { get; set; }
    public string Institution { get; set; }
    public int StartYear { get; set; }
    public int GraduationYear { get; set; }

    public AddEducationByIdRequest(int jobSeekerId, string degree, string institution, int startYear, int graduationYear)
    {
        JobSeekerId = jobSeekerId;
        Degree = degree;
        Institution = institution;
        StartYear = startYear;
        GraduationYear = graduationYear;
    }
}
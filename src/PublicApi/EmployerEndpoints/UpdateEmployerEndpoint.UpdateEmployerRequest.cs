namespace PublicApi.EmployerEndpoints;

public class UpdateEmployerRequest : BaseRequest
{
    public int EmployerId { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string CompanyName { get; set; }
    public string Description { get; set; }
    public string Industry { get; set; }
        
}
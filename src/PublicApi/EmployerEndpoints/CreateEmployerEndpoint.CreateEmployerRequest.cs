using System.Text.Json.Serialization;

namespace PublicApi.EmployerEndpoints;

public class CreateEmployerRequest : BaseRequest
{
    public string Name { get; set; } = string.Empty;
    [JsonPropertyName("lastName")] 
    public string Surname { get; set; } = string.Empty;
    public string CompanyName { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Industry { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty; // Password included only for creation
}
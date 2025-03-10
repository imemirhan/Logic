namespace PublicApi.JobSeekerEndpoints
{
    public class CreateJobSeekerRequest : BaseRequest
    {
        // Make properties public for model binding
        public string Name { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty; // Password included only for creation
    }
}
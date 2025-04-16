namespace PublicApi.JobEndpoints;

public class GetJobByNameRequest : BaseRequest
{
    public string Name { get; init; } = string.Empty;

    public GetJobByNameRequest(string name)
    {
        Name = name;
    }
}

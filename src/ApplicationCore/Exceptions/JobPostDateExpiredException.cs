namespace ApplicationCore.Exceptions;

public class JobPostDateExpiredException : Exception
{
    public JobPostDateExpiredException() : base("The expiry date can't be set in the past")
    {
    }
}
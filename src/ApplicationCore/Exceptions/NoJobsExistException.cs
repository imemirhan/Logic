namespace ApplicationCore.Exceptions;

public class NoJobsExistException : Exception
{
    public NoJobsExistException() : base("No jobs are found.")
    {
    }
}
using ApplicationCore.Interfaces;
using Ardalis.GuardClauses;

namespace ApplicationCore.Entities.FeedbackAggregate;

public class Feedback : BaseEntity, IAggregateRoot
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Message { get; set; }
    public DateTime CreatedAt { get; set; }

    public Feedback(string name, string email, string message, DateTime createdAt)
    {
        Guard.Against.NullOrEmpty(name, nameof(name));
        Guard.Against.NullOrEmpty(email, nameof(email));
        Guard.Against.NullOrEmpty(message, nameof(message));
        Guard.Against.Null(createdAt, nameof(createdAt));
        
        Name = name;
        Email = email;
        Message = message;
        CreatedAt = createdAt;
    }

#pragma warning disable CS8618
    private Feedback() { }
}
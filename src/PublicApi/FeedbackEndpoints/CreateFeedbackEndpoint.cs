using ApplicationCore.Entities.FeedbackAggregate;
using ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;

namespace PublicApi.FeedbackEndpoints;

public class CreateFeedbackEndpoint : IEndpoint<IResult, CreateFeedbackRequest, IRepository<Feedback>>
{
    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapPost("api/feedbacks",
            [AllowAnonymous] // Typically feedback doesn't require auth
            async (CreateFeedbackRequest request, IRepository<Feedback> repository) =>
            {
                return await HandleAsync(request, repository);
            })
            .WithName("CreateFeedback")
            .Produces<CreateFeedbackResponse>(StatusCodes.Status201Created)
            .WithTags("Feedback Endpoints");
    }

    public async Task<IResult> HandleAsync(CreateFeedbackRequest request, IRepository<Feedback> repository)
    {
        var response = new CreateFeedbackResponse(request.CorrelationId());
        var feedback = new Feedback(
            name: request.Name,
            email: request.Email,
            message: request.Message,
            createdAt: DateTime.UtcNow
        );

        var createdFeedback = await repository.AddAsync(feedback);

        response.Feedback = new FeedbackDto
        {
            Id = createdFeedback.Id,
            Name = createdFeedback.Name,
            Email = createdFeedback.Email,
            Message = createdFeedback.Message,
            CreatedAt = createdFeedback.CreatedAt
        };

        return Results.Created($"/api/feedbacks/{createdFeedback.Id}", response);
    }
}
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using ApplicationCore.Entities.EmployerAggregate;
using ApplicationCore.Interfaces;
using Ardalis.GuardClauses;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;
using System.Net;

namespace PublicApi.EmployerEndpoints;

public class DeleteEmployerProfilePictureEndpoint : IEndpoint<IResult, Guid, IRepository<Employer>>
{
    private readonly Cloudinary _cloudinary;

    public DeleteEmployerProfilePictureEndpoint(Cloudinary cloudinary)
    {
        _cloudinary = cloudinary;
    }

    public async Task<IResult> HandleAsync(Guid employerId, IRepository<Employer> repository)
    {
        var employer = await repository.GetByIdAsync(employerId);
        if (employer == null)
            return Results.NotFound($"Employer with ID {employerId} not found.");

        if (string.IsNullOrEmpty(employer.ProfileImageUrl))
            return Results.BadRequest("Employer does not have a profile image.");

        // Extract public ID from the URL
        var publicId = GetCloudinaryPublicId(employer.ProfileImageUrl);

        var deletionResult = await _cloudinary.DestroyAsync(new DeletionParams(publicId));

        if (deletionResult.Result != "ok")
            return Results.StatusCode((int)HttpStatusCode.InternalServerError);

        employer.RemoveProfileImage();
        await repository.UpdateAsync(employer);

        return Results.Ok("Profile picture deleted.");
    }

    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapDelete("api/employers/{employerId:guid}/profile-picture",
            [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
            async (Guid employerId, IRepository<Employer> repository) =>
            {
                return await HandleAsync(employerId, repository);
            })
            .Produces(StatusCodes.Status200OK)
            .WithTags("EmployerEndpoints");
    }

    private string GetCloudinaryPublicId(string url)
    {
        var uri = new Uri(url);
        var segments = uri.AbsolutePath.Split('/');
        var filenameWithExtension = segments.Last();
        var folder = string.Join("/", segments.SkipWhile(s => s != "upload").Skip(1).Take(segments.Length - 2));
        var filenameWithoutExt = Path.GetFileNameWithoutExtension(filenameWithExtension);
        return $"{folder}/{filenameWithoutExt}";
    }
}

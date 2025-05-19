using System.Net;
using ApplicationCore.Entities.EmployerAggregate;
using ApplicationCore.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using MinimalApi.Endpoint;

namespace PublicApi.EmployerEndpoints;

public class UploadEmployerProfilePictureEndpoint : IEndpoint<IResult, UploadEmployerProfilePictureRequest, IRepository<Employer>>
{
    private readonly Cloudinary _cloudinary;

    public UploadEmployerProfilePictureEndpoint(Cloudinary cloudinary)
    {
        _cloudinary = cloudinary;
    }

    public async Task<IResult> HandleAsync(UploadEmployerProfilePictureRequest request, IRepository<Employer> repository)
    {
        if (request.File == null || request.File.Length == 0)
            return Results.BadRequest("No file uploaded.");

        var uploadResult = await _cloudinary.UploadAsync(new ImageUploadParams
        {
            File = new FileDescription(request.File.FileName, request.File.OpenReadStream()),
            Folder = "employer-profile-pictures"
        });

        if (uploadResult.StatusCode != HttpStatusCode.OK)
            return Results.StatusCode((int)uploadResult.StatusCode);

        // Assume employer ID is extracted from token or request
        var employerId = request.employerId;
        var employer = await repository.GetByIdAsync(employerId);
        if (employer == null) return Results.NotFound();

        employer.UpdateProfileImage(profileImageUrl: uploadResult.SecureUrl.ToString());
        await repository.UpdateAsync(employer);

        return Results.Ok(new { imageUrl = uploadResult.SecureUrl.ToString() });
    }

    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapPost("api/employers/profile-picture",
                [Authorize(Roles = Shared.Authorization.Constants.Roles.EMPLOYER, 
                    AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
                async (HttpRequest httpRequest, [FromForm] UploadEmployerProfilePictureRequest request, IRepository<Employer> repository) =>
                {
                    if (request.File == null || request.File.Length == 0)
                        return Results.BadRequest("No file uploaded.");

                    var cloudinary = app.ServiceProvider.GetRequiredService<Cloudinary>();

                    var uploadResult = await cloudinary.UploadAsync(new ImageUploadParams
                    {
                        File = new FileDescription(request.File.FileName, request.File.OpenReadStream()),
                        Folder = "employer-profile-pictures"
                    });

                    if (uploadResult.StatusCode != HttpStatusCode.OK)
                        return Results.StatusCode((int)uploadResult.StatusCode);

                    var employerId = request.employerId;
                    var employer = await repository.GetByIdAsync(employerId);
                    if (employer == null) return Results.NotFound();

                    employer.UpdateProfileImage(profileImageUrl: uploadResult.SecureUrl.ToString());
                    await repository.UpdateAsync(employer);

                    return Results.Ok(new { imageUrl = uploadResult.SecureUrl.ToString() });
                })
            .DisableAntiforgery()
            .Accepts<UploadEmployerProfilePictureRequest>("multipart/form-data")
            .Produces(StatusCodes.Status200OK)
            .WithTags("EmployerEndpoints");
    }

}

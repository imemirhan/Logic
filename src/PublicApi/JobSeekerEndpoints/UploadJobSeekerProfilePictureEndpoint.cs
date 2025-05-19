using System.Net;
using ApplicationCore.Entities.JobSeekerAggregate;
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

namespace PublicApi.JobSeekerEndpoints;

public class UploadJobSeekerProfilePictureEndpoint : IEndpoint<IResult, UploadJobSeekerProfilePictureRequest, IRepository<JobSeeker>>
{
    private readonly Cloudinary _cloudinary;

    public UploadJobSeekerProfilePictureEndpoint(Cloudinary cloudinary)
    {
        _cloudinary = cloudinary;
    }

    public async Task<IResult> HandleAsync(UploadJobSeekerProfilePictureRequest request, IRepository<JobSeeker> repository)
    {
        if (request.File == null || request.File.Length == 0)
            return Results.BadRequest("No file uploaded.");

        var uploadResult = await _cloudinary.UploadAsync(new ImageUploadParams
        {
            File = new FileDescription(request.File.FileName, request.File.OpenReadStream()),
            Folder = "jobseeker-profile-pictures"
        });

        if (uploadResult.StatusCode != HttpStatusCode.OK)
            return Results.StatusCode((int)uploadResult.StatusCode);

        var jobSeekerId = request.JobSeekerId;
        var jobSeeker = await repository.GetByIdAsync(jobSeekerId);
        if (jobSeeker == null) return Results.NotFound();

        jobSeeker.UpdateProfileImage(profileImageUrl: uploadResult.SecureUrl.ToString());
        await repository.UpdateAsync(jobSeeker);

        return Results.Ok(new { imageUrl = uploadResult.SecureUrl.ToString() });
    }

    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapPost("api/jobseekers/profile-picture",
                [Authorize(Roles = Shared.Authorization.Constants.Roles.JOBSEEKER, 
                    AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
                async (HttpRequest httpRequest, [FromForm] UploadJobSeekerProfilePictureRequest request, IRepository<JobSeeker> repository) =>
                {
                    if (request.File == null || request.File.Length == 0)
                        return Results.BadRequest("No file uploaded.");

                    var cloudinary = app.ServiceProvider.GetRequiredService<Cloudinary>();

                    var uploadResult = await cloudinary.UploadAsync(new ImageUploadParams
                    {
                        File = new FileDescription(request.File.FileName, request.File.OpenReadStream()),
                        Folder = "jobseeker-profile-pictures"
                    });

                    if (uploadResult.StatusCode != HttpStatusCode.OK)
                        return Results.StatusCode((int)uploadResult.StatusCode);

                    var jobSeekerId = request.JobSeekerId;
                    var jobSeeker = await repository.GetByIdAsync(jobSeekerId);
                    if (jobSeeker == null) return Results.NotFound();

                    jobSeeker.UpdateProfileImage(profileImageUrl: uploadResult.SecureUrl.ToString());
                    await repository.UpdateAsync(jobSeeker);

                    return Results.Ok(new { imageUrl = uploadResult.SecureUrl.ToString() });
                })
            .DisableAntiforgery() // 👈 this tells ASP.NET not to require anti-forgery middleware
            .Accepts<UploadJobSeekerProfilePictureRequest>("multipart/form-data")
            .Produces(StatusCodes.Status200OK)
            .WithTags("JobSeeker Endpoints");
    }

}

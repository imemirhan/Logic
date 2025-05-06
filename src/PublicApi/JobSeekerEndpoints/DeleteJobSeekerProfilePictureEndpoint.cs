using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using ApplicationCore.Entities.JobSeekerAggregate;
using ApplicationCore.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using MinimalApi.Endpoint;
using System.Net;

namespace PublicApi.JobSeekerEndpoints;

public class DeleteJobSeekerProfilePictureEndpoint : IEndpoint<IResult, Guid, IRepository<JobSeeker>>
{
    private readonly Cloudinary _cloudinary;

    public DeleteJobSeekerProfilePictureEndpoint(Cloudinary cloudinary)
    {
        _cloudinary = cloudinary;
    }

    public async Task<IResult> HandleAsync(Guid jobSeekerId, IRepository<JobSeeker> repository)
    {
        var jobSeeker = await repository.GetByIdAsync(jobSeekerId);
        if (jobSeeker == null)
            return Results.NotFound($"JobSeeker with ID {jobSeekerId} not found.");

        if (string.IsNullOrEmpty(jobSeeker.ProfileImageUrl))
            return Results.BadRequest("JobSeeker does not have a profile image.");

        // Extract public ID from the URL
        var publicId = GetCloudinaryPublicId(jobSeeker.ProfileImageUrl);

        var deletionResult = await _cloudinary.DestroyAsync(new DeletionParams(publicId));

        if (deletionResult.Result != "ok")
            return Results.StatusCode((int)HttpStatusCode.InternalServerError);

        jobSeeker.DeleteProfileImage();
        await repository.UpdateAsync(jobSeeker);

        return Results.Ok("Profile picture deleted.");
    }

    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapDelete("api/jobseekers/{jobSeekerId:guid}/profile-picture",
            [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
            async (Guid jobSeekerId, IRepository<JobSeeker> repository) =>
            {
                return await HandleAsync(jobSeekerId, repository);
            })
            .Produces(StatusCodes.Status200OK)
            .WithTags("JobSeeker Endpoints");
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

using System.Net;
using ApplicationCore.Entities.JobSeekerAggregate;
using ApplicationCore.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using MinimalApi.Endpoint;

namespace PublicApi.JobSeekerEndpoints;

public class AddJobSeekerResumeEndpoint : IEndpoint<IResult, AddJobSeekerResumeRequest, IRepository<JobSeeker>>
{
    private readonly Cloudinary _cloudinary;

    public AddJobSeekerResumeEndpoint(Cloudinary cloudinary)
    {
        _cloudinary = cloudinary;
    }

    public async Task<IResult> HandleAsync(AddJobSeekerResumeRequest request, IRepository<JobSeeker> repository)
    {
        if (request.File == null || request.File.Length == 0)
            return Results.BadRequest("No file uploaded.");

        if (!request.File.FileName.EndsWith(".pdf"))
            return Results.BadRequest("Only PDF files are allowed.");

        var uploadResult = await _cloudinary.UploadAsync(new AutoUploadParams()
        {
            File = new FileDescription(request.File.FileName, request.File.OpenReadStream()),
            Folder = "jobseeker-resumes",
        });

        if (uploadResult.StatusCode != HttpStatusCode.OK)
            return Results.StatusCode((int)uploadResult.StatusCode);

        var jobSeeker = await repository.GetByIdAsync(request.JobSeekerId);
        if (jobSeeker == null) return Results.NotFound();

        jobSeeker.AddResume(uploadResult.SecureUrl.ToString());
        await repository.UpdateAsync(jobSeeker);

        return Results.Ok(new { imageUrl = uploadResult.SecureUrl.ToString() });
    }

    public void AddRoute(IEndpointRouteBuilder app)
    {
        app.MapPost("api/jobseekers/resume",
                async (HttpRequest httpRequest, [FromForm] AddJobSeekerResumeRequest request, IRepository<JobSeeker> repository) =>
                {
                    if (request.File == null || request.File.Length == 0)
                        return Results.BadRequest("No file uploaded.");

                    if (!request.File.FileName.EndsWith(".pdf"))
                        return Results.BadRequest("Only PDF files are allowed.");

                    var cloudinary = app.ServiceProvider.GetRequiredService<Cloudinary>();
                    //TODO => BU KOD YANLIS !!! SADECE IMAGELAR ICIN CALISIYOR, BIR YOL BULUNMALI
                    var uploadResult = await cloudinary.UploadAsync(new RawUploadParams
                    {
                        File = new FileDescription(request.File.FileName, request.File.OpenReadStream()),
                        Folder = "jobseeker-resumes"
                    });

                    if (uploadResult.StatusCode != HttpStatusCode.OK)
                        return Results.StatusCode((int)uploadResult.StatusCode);

                    var jobSeeker = await repository.GetByIdAsync(request.JobSeekerId);
                    if (jobSeeker == null) return Results.NotFound();

                    jobSeeker.AddResume(uploadResult.SecureUrl.ToString());
                    await repository.UpdateAsync(jobSeeker);

                    return Results.Ok(new { imageUrl = uploadResult.SecureUrl.ToString() });
                })
            .DisableAntiforgery()
            .Accepts<AddJobSeekerResumeRequest>("multipart/form-data")
            .Produces(StatusCodes.Status200OK)
            .WithTags("JobSeeker Endpoints");
    }
}

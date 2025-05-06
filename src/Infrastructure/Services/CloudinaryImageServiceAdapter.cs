using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace Infrastructure.Services;

public class CloudinaryImageServiceAdapter : ImageServiceBase
{
    private readonly Cloudinary _cloudinary;

    public CloudinaryImageServiceAdapter(IConfiguration configuration)
    {
        Account account = configuration.GetSection("CloudinaryAccount").Get<Account>();
        _cloudinary = new Cloudinary(account);
    }

    public override async Task<string> UploadAsync(IFormFile formFile)
    {
        await FileMustBeInImageFormat(formFile);

        ImageUploadParams imageUploadParams =
            new()
            {
                File = new FileDescription(formFile.FileName, stream: formFile.OpenReadStream()),
                UseFilename = false,
                UniqueFilename = true,
                Overwrite = false
            };
        ImageUploadResult imageUploadResult = await _cloudinary.UploadAsync(imageUploadParams);

        return imageUploadResult.Url.ToString();
    }
    
    public async Task<string> UploadResumeAsync(IFormFile formFile)
    {
        if (formFile == null || formFile.Length == 0)
            throw new ArgumentException("Invalid resume file");

        RawUploadParams uploadParams = new()
        {
            File = new FileDescription(formFile.FileName, formFile.OpenReadStream()),
            UseFilename = true,
            UniqueFilename = true,
            Overwrite = false,
            Folder = "jobseeker-resumes",
            Type = "upload" // Important: makes the file publicly accessible
        };

        RawUploadResult uploadResult = await _cloudinary.UploadAsync(uploadParams);

        if (uploadResult.StatusCode != System.Net.HttpStatusCode.OK)
            throw new Exception("Cloudinary resume upload failed");

        return uploadResult.SecureUrl.ToString();
    }

    public override async Task DeleteAsync(string imageUrl)
    {
        DeletionParams deletionParams = new(GetPublicId(imageUrl));
        await _cloudinary.DestroyAsync(deletionParams);
    }
    
    public async Task DeleteResumeAsync(string resumeUrl)
    {
        DeletionParams deletionParams = new(GetPublicId(resumeUrl))
        {
            ResourceType = ResourceType.Raw
        };
        await _cloudinary.DestroyAsync(deletionParams);
    }


    private string GetPublicId(string imageUrl)
    {
        int startIndex = imageUrl.LastIndexOf('/') + 1;
        int endIndex = imageUrl.LastIndexOf('.');
        int length = endIndex - startIndex;
        return imageUrl.Substring(startIndex, length);
    }
}
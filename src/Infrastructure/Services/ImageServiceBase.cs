﻿using Microsoft.AspNetCore.Http;

namespace Infrastructure.Services;

public abstract class ImageServiceBase
{
    public abstract Task<string> UploadAsync(IFormFile formFile);

    public async Task<string> UpdateAsync(IFormFile formFile, string imageUrl)
    {
        await FileMustBeInImageFormat(formFile);

        await DeleteAsync(imageUrl);
        return await UploadAsync(formFile);
    }

    public abstract Task DeleteAsync(string imageUrl);

    protected async Task FileMustBeInImageFormat(IFormFile formFile)
    {
        List<string> extensions = new() { ".jpg", ".png", ".jpeg", ".webp" };

        string extension = Path.GetExtension(formFile.FileName).ToLower();
        if (!extensions.Contains(extension))
            throw new Exception("Unsupported format");
        await Task.CompletedTask;
    }
}
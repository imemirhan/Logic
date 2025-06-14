﻿using ApplicationCore.Interfaces;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Logging;

public class LoggerAdapter<T> : IAppLogger<T>
{
    private readonly ILogger<T> _logger;
    public LoggerAdapter(ILoggerFactory loggerFactory)
    {
        _logger = loggerFactory.CreateLogger<T>();
    }

    public void LogWarning(string message, params object[] args)
    {
        _logger.LogWarning(message, args);
    }

    public void LogError(string message, params object[] args)
    {
        _logger.LogError(message, args);
    }

    public void LogVerbose(string message, params object[] args)
    {
        _logger.LogDebug(message, args);
    }

    public void LogFatal(string message, params object[] args)
    {
        _logger.LogCritical(message, args);
    }

    public void LogInformation(string message, params object[] args)
    {
        _logger.LogInformation(message, args);
    }
}

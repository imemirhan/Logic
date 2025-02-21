using System;

namespace Shared.Attributes;

public class EndpointAttribute : Attribute
{
    public string Name { get; set; }
}

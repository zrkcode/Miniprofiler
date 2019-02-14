using Microsoft.AspNetCore.Http;
using StackExchange.Profiling;
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace MiniprofilerApi.MiniProfierHelp
{
    public class InjectMiniProfiler : IDocumentFilter
    {
        private readonly IHttpContextAccessor _httpContext;
        public InjectMiniProfiler(IHttpContextAccessor httpContext)
        {
            _httpContext = httpContext;
        }
        public void Apply(SwaggerDocument swaggerDoc, DocumentFilterContext context)
        {
            swaggerDoc.Info.Contact = new Contact()
            {
                Name = MiniProfiler.Current.RenderIncludes(_httpContext.HttpContext).ToString()
            };
        }
    }
}

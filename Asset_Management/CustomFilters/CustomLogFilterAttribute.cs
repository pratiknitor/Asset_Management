using Microsoft.AspNetCore.Mvc.Filters;
using System.Diagnostics;

namespace Asset_Management.CustomFilters
{
    public class CustomLogFilterAttribute : ActionFilterAttribute
    {
        private readonly ILogger _logger;

        public CustomLogFilterAttribute(ILoggerFactory logger)
        {
            _logger = logger.CreateLogger<CustomExceptionFilterAttribute>();
        }
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            Debug.WriteLine("On Action Executing : " + context);
            _logger.LogInformation("\nOn Action Executing : \nController : " + context.RouteData.Values["controller"].ToString()
                + "\nAction : " + context.RouteData.Values["action"].ToString());
        }

        public override void OnActionExecuted(ActionExecutedContext context)
        {
            Debug.WriteLine("On Action Executed : " + context);
            _logger.LogInformation("\nOn Action Executed : \nController : " + context.RouteData.Values["controller"].ToString() 
                + "\nAction : " + context.RouteData.Values["action"].ToString());
        }

        public override void OnResultExecuting(ResultExecutingContext context)
        {
            Debug.WriteLine("On Result Executing : " + context);
            _logger.LogInformation("\nOn Result Executing : \nController : " + context.RouteData.Values["controller"].ToString() 
                + "\nAction : " + context.RouteData.Values["action"].ToString());
        }

        public override void OnResultExecuted(ResultExecutedContext context)
        {
            Debug.WriteLine("On Result Executed : " + context);
            _logger.LogInformation("\nOn Result Executed : \nController : " + context.RouteData.Values["controller"].ToString() 
                + "\nAction : " + context.RouteData.Values["action"].ToString());
        }
    }
}

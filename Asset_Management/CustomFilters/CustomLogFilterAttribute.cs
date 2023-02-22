using Microsoft.AspNetCore.Mvc.Filters;
using System.Diagnostics;

namespace Asset_Management.CustomFilters
{
    public class CustomLogFilterAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            Debug.WriteLine("On Action Executing : "+context);
        }

        public override void OnActionExecuted(ActionExecutedContext context)
        {
            Debug.WriteLine("On Action Executed : " + context);
        }

        public override void OnResultExecuting(ResultExecutingContext context)
        {
            Debug.WriteLine("On Result Executing : " + context);
        }

        public override void OnResultExecuted(ResultExecutedContext context)
        {
            Debug.WriteLine("On Result Executed : " + context);
        }
    }
}

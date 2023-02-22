using Microsoft.AspNetCore.Mvc.Filters;
using System.Diagnostics;

namespace Asset_Management.CustomFilters
{
    public class CustomExceptionFilterAttribute : IExceptionFilter
    {
       /* public override void OnException(ExceptionContext context)
        {
            //Hadle Exception
            context.ExceptionHandled = true;
            //error message
            string errorMessage = context.Exception.Message;
            DateOnly date = DateOnly.Parse(DateTime.Now.ToString());
            Debug.WriteLine($"Error is {errorMessage}");
        }
       */

        void IExceptionFilter.OnException(ExceptionContext context)
        {
            //Hadle Exception
            context.ExceptionHandled = true;
            //error message
            string errorMessage = context.Exception.Message;
            DateTime date = DateTime.Now;
            Debug.WriteLine($"Error is {errorMessage} on {date}");
            
        }
    }
}

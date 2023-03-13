using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models;
using ServiceLayer.Service.Interface;

namespace OnionArchitecture.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            this._employeeService = employeeService;
        }

        //Get all employees
        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            var result = await _employeeService.GetAllEmployeesAsync();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEmployeeById(int id)
        {
            return Ok(await _employeeService.GetEmployeeById(id));
        }

        public async Task<IActionResult> AddEmployee(Employee emp)
        {
            return Ok(await _employeeService.AddNewEmployee(emp));
        }

        public async Task<IActionResult> EditEmployee(int id, Employee emp)
        {
            return Ok(await _employeeService.EditEmployee(id, emp));
        }

        public async Task<IActionResult> DeleteEmployee(int id)
        {
            return Ok(await _employeeService.DeleteEmployee(id));
        }

    }
}

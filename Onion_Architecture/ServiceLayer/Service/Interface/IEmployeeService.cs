using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Service.Interface
{
    public interface IEmployeeService
    {
        //Get All employee details
        Task<List<Employee>> GetAllEmployeesAsync();

        //Get employee detail
        Task<Employee> GetEmployeeById(int id);

        //Add new employee
        Task<Employee> AddNewEmployee(Employee employee);

        //Update or edit existing employee
        Task<Employee> EditEmployee(int id, Employee employee);

        //Delete employee
        Task<Employee> DeleteEmployee(int id);
    }
}

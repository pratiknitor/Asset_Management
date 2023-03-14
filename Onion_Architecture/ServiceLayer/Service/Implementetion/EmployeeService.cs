using Microsoft.EntityFrameworkCore;
using Models.Models;
using RepositoryLayer;
using ServiceLayer.Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceLayer.Service.Implementetion
{
    public class EmployeeService : IEmployeeService
    {
        private AppDBContext _dbContext;

        public EmployeeService(AppDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        //Add new employee in employee table
        public async Task<Employee> AddNewEmployee(Employee employee)
        {
            try
            {
                var record = await this._dbContext.AddAsync(employee);
                await this._dbContext.SaveChangesAsync();
                return record.Entity;
            }
            catch (Exception)
            {
                throw;
            }
        }

        //Delete employee in employee table
        public async Task<Employee> DeleteEmployee(int id)
        {
            try
            {
                var record = await this._dbContext.Employees.FindAsync(id);
                if (record != null)
                {
                    this._dbContext.Remove(record);
                    await this._dbContext.SaveChangesAsync();
                    return record;
                }
                else
                {
                    throw new Exception("Employee not found in records");
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        //Update employee in employee table
        public async Task<Employee> EditEmployee(int id, Employee employee)
        {
            try
            {
                var record = await this._dbContext.Employees.FindAsync(id);
                if(record != null)
                {
                    if(record.Name!=null && record.Name != employee.Name)
                    {
                        record.Name = employee.Name;
                    }
                    if (record.EmployeeId != null && record.EmployeeId != employee.EmployeeId)
                    {
                        record.EmployeeId = employee.EmployeeId;
                    }
                    if (record.EmailId != null && record.EmailId != employee.EmailId)
                    {
                        record.EmailId = employee.EmailId;
                    }
                    if (record.JoinDate != employee.JoinDate)
                    {
                        record.JoinDate = employee.JoinDate;
                    }
                    await this._dbContext.SaveChangesAsync();
                    return record;
                }
                else
                {
                    throw new Exception("Employee not found in records");
                }
            }
            catch (Exception)
            {
                throw;
            }
        }

        //Get all employees in employee table
        public async Task<List<Employee>> GetAllEmployeesAsync()
        {
            return await this._dbContext.Employees.ToListAsync();
        }

        //Get employee in employee table
        public async Task<Employee> GetEmployeeById(int id)
        {
            return await this._dbContext.Employees.FindAsync(id);
        }
    }
}

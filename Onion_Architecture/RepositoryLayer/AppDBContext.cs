using Microsoft.EntityFrameworkCore;
using Models.Models;

namespace RepositoryLayer
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions connection) : base(connection) { }

        public DbSet<Employee> Employees { get; set; }
    }
}
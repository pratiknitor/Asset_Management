using Asset_Management.Models;

namespace Asset_Management.Services.Interface
{
    public interface IAuthService<TEntity, in Tpk> where TEntity : class
    {
        Task<TEntity> Login(User user);
    }
}

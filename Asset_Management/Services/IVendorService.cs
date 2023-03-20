using System.Collections;

namespace Asset_Management.Services
{
    public interface IVendorService<TEntity, in Tpk> where TEntity : class
    {
        Task<IEnumerable> GetVendorsData();
    }
}

using System.Collections;

namespace Asset_Management.Services.Interface
{
    public interface IVendorService<TEntity, in Tpk> where TEntity : class
    {
        Task<IEnumerable> GetVendorsData();
    }
}

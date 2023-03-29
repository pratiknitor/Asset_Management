using System.Collections;

namespace Asset_Management.Services.Interface
{
    public interface IVendorService<TEntity, in Tpk> where TEntity : class
    {
        /// <summary>
        /// Provide information on the asset count for each vendor.
        /// See more details in implementation
        /// </summary>
        /// <returns></returns>
        Task<IEnumerable> GetVendorsData();
    }
}

﻿using System.Collections;

namespace Asset_Management.Services.Interface
{
    public interface IAssetDetailService<TEntity, in Tpk> where TEntity : class
    {
        Task<IEnumerable<TEntity>> GetByTypeAsync(Tpk type);
        Task<IEnumerable<TEntity>> GetByVendorAsync(Tpk vendor);
        Task<IEnumerable> GetCountOfAssets();

        Task<IEnumerable<TEntity>> GetUnassignedAsset();

        Task<IEnumerable<TEntity>> GetassignedAsset();
    }
}

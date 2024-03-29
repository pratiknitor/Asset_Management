﻿using Asset_Management.Models;
using Asset_Management.Services.Interface;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using System.Xml.Linq;

namespace Asset_Management.Services.Implementation
{
    public class AssetDetailService : IService<AssetDetail, int>, IAssetDetailService<AssetDetail, string>
    {
        asset_managementContext ctx;


        public AssetDetailService(asset_managementContext db)
        {
            ctx = db;
        }
        async Task<AssetDetail> IService<AssetDetail, int>.CreateAsync(AssetDetail entity)
        {
                var record = await ctx.AssetDetails.AddAsync(entity);
                await ctx.SaveChangesAsync();
                return record.Entity;
        }

        async Task<AssetDetail> IService<AssetDetail, int>.DeleteAsync(int id)
        {
                var record = await ctx.AssetDetails.FindAsync(id);
                if (record != null)
                {
                    ctx.AssetDetails.Remove(record);
                    await ctx.SaveChangesAsync();
                    return record;
                }
                else
                {
                    return record;
                }
        }

        async Task<IEnumerable<AssetDetail>> IService<AssetDetail, int>.GetAsync()
        {
                var records = (await ctx.AssetDetails.ToListAsync()).OrderByDescending(v => v.Id);

                if (records == null)
                {
                    throw new Exception("Records not Found");
                }
                else
                {
                    return records;
                }
        }

        async Task<AssetDetail> IService<AssetDetail, int>.GetAsync(int id)
        {
                var record = await ctx.AssetDetails.FindAsync(id);
                if (record == null)
                    throw new Exception("Record not found");
                return record;
        }

        async Task<IEnumerable<AssetDetail>> IAssetDetailService<AssetDetail, string>.GetByTypeAsync(string type)
        {
                var records = await ctx.AssetDetails.Where(a => a.Tyape.Equals(type)).ToListAsync();
                return records;
        }

        async Task<IEnumerable<AssetDetail>> IAssetDetailService<AssetDetail, string>.GetByVendorAsync(string vendor)
        {
                var records = await ctx.AssetDetails.Where(a => a.VendorId == Convert.ToInt32(vendor)).ToListAsync();
                return records;
        }

        async Task<AssetDetail> IService<AssetDetail, int>.UpdateAsync(int id, AssetDetail entity)
        {
                var record = await ctx.AssetDetails.FindAsync(id);
                if (record == null)
                    throw new Exception("Record not found");
                record.Proprietary = entity.Proprietary;

                record.Configuration = entity.Configuration;
                record.Name = entity.Name;
                record.Remarks = entity.Remarks;
                record.Ram = entity.Ram;
                record.Oem = entity.Oem;
                record.Owner = entity.Owner;
                record.ServiceTag = entity.ServiceTag;
                record.Model = entity.Model;
                record.HostName = entity.HostName;
                record.ExpiryDate = entity.ExpiryDate;
                record.VendorId = entity.VendorId;
                record.Tyape = entity.Tyape;
                await ctx.SaveChangesAsync();
                return record;
        }


        /// <summary>
        /// Count the assets by type.
        /// </summary>
        /// <returns></returns>
        async Task<IEnumerable> IAssetDetailService<AssetDetail, string>.GetCountOfAssets()
        {
            ///get all assets
            var Total = await ctx.AssetDetails.ToListAsync();
            ///group assets by there type
            var list = from a in Total
                       group a by a.Tyape into g
                       select new
                       {
                           type = g.Key,
                           count = g.Count()
                       };

            return list;
        }

        /// <summary>
        /// Get list of unassigned assets
        /// </summary>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        async Task<IEnumerable<AssetDetail>> IAssetDetailService<AssetDetail, string>.GetUnassignedAsset()
        {
                var result = (await ctx.AssetDetails.ToListAsync())
                ///Find the assets whose asset id's are missing from the asset transaction table.
                .Where(ad => !ctx.AssetTransactions.Any(at => at.AssetId == ad.Id))
                .OrderByDescending(v => v.Id)
                .ToList();

                if (result == null)
                {
                    throw new Exception("Records not Found");
                }
                else
                {
                    return result;
                }
        }

        /// <summary>
        /// Get assigned assets
        /// </summary>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        async Task<IEnumerable<AssetDetail>> IAssetDetailService<AssetDetail, string>.GetassignedAsset()
        {
                var result = (await ctx.AssetDetails.ToListAsync())
                ///Find the assets whose asset id's are in the asset transaction table
                .Where(ad => ctx.AssetTransactions.Any(at => at.AssetId == ad.Id))
                .OrderByDescending(v => v.Id)
                .ToList();

                if (result == null)
                {
                    throw new Exception("Records not Found");
                }
                else
                {
                    return result;
                }
        }
    }
}

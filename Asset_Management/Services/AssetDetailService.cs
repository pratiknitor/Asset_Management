using Asset_Management.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using System.Xml.Linq;

namespace Asset_Management.Services
{
    public class AssetDetailService : IService<AssetDetail, int>,IAssetDetailService<AssetDetail,string>
    {
        asset_managementContext ctx;
        

        public AssetDetailService(asset_managementContext db)
        {
            this.ctx = db;
        }
        async Task<AssetDetail> IService<AssetDetail, int>.CreateAsync(AssetDetail entity)
        {
            try
            {
                var record = await ctx.AssetDetails.AddAsync(entity);
                await ctx.SaveChangesAsync();
                return record.Entity;
            }
            catch (Exception)
            {

                throw;
            }
        }

        async Task<AssetDetail> IService<AssetDetail, int>.DeleteAsync(int id)
        {
            try
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
            catch (Exception)
            {
                throw;
            }
        }

        async Task<IEnumerable<AssetDetail>> IService<AssetDetail, int>.GetAsync()
        {
            try
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
            catch (Exception)
            {

                throw;
            }
        }

        async Task<AssetDetail> IService<AssetDetail, int>.GetAsync(int id)
        {
            try
            {
                var record = await ctx.AssetDetails.FindAsync(id);
                if (record == null)
                    throw new Exception("Record not found");
                return record;
            }
            catch (Exception)
            {

                throw;
            }
        }

        async Task<IEnumerable<AssetDetail>> IAssetDetailService<AssetDetail, string>.GetByTypeAsync(string type)
        {
            try
            {
                var records = await ctx.AssetDetails.Where(a => a.Tyape.Equals(type)).ToListAsync();
                return records;
            }
            catch (Exception)
            {

                throw;
            }
        }

        async Task<IEnumerable<AssetDetail>> IAssetDetailService<AssetDetail, string>.GetByVendorAsync(string vendor)
        {
            try
            {
                var records = await ctx.AssetDetails.Where(a=>a.VendorId == Convert.ToInt32(vendor)).ToListAsync();
                return records;
            }
            catch (Exception)
            {

                throw;
            }
        }

        async Task<AssetDetail> IService<AssetDetail, int>.UpdateAsync(int id, AssetDetail entity)
        {
            try
            {
                var record = await ctx.AssetDetails.FindAsync(id);
                if (record == null)
                    throw new Exception("Record not found");
                record.Proprietary = entity.Proprietary;
                   
                    record.Configuration = entity.Configuration;
                    record.Name = entity.Name;
                    record.Remarks = entity.Remarks;
                    record.Ram = entity.Ram;
                    record.Oem= entity.Oem;
                    record.Owner = entity.Owner;
                    record.ServiceTag= entity.ServiceTag;
                    record.Model= entity.Model;
                    record.HostName= entity.HostName;
                    record.ExpiryDate= entity.ExpiryDate;
                    record.VendorId= entity.VendorId;
                    record.Tyape = entity.Tyape;
                    await ctx.SaveChangesAsync();
                    return record;
            }
            catch (Exception)
            {

                throw;
            }
        }

        async Task<IEnumerable> IAssetDetailService<AssetDetail, string>.GetCountOfAssets()
        {

            var Total = (await ctx.AssetDetails.ToListAsync());

            var list = from a in Total
                       group a by a.Tyape into g
                       select new
                       {
                           type = g.Key,
                           count = g.Count()
                       };
           
            return list;
        }

        async Task<IEnumerable<AssetDetail>> IAssetDetailService<AssetDetail, string>.GetUnassignedAsset()
        {
            try
            {
                var result = (await ctx.AssetDetails.ToListAsync())
                .Where(ad => !ctx.AssetTransactions.Any(at => at.AssetId == ad.Id))
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
            catch (Exception)
            {

                throw;
            }
        }

        async Task<IEnumerable<AssetDetail>> IAssetDetailService<AssetDetail, string>.GetassignedAsset()
        {
            try
            {
                var result = (await ctx.AssetDetails.ToListAsync())
                .Where(ad => ctx.AssetTransactions.Any(at => at.AssetId == ad.Id))
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
            catch (Exception)
            {

                throw;
            }
        }
    }
}

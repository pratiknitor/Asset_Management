using Asset_Management.Models;
using Asset_Management.Services.Interface;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using System.Diagnostics;

namespace Asset_Management.Services.Implementation
{
    public class VendorService : IService<Vendor, int>, IVendorService<Vendor, int>
    {
        asset_managementContext ctx;

        public VendorService(asset_managementContext ctx)
        {
            this.ctx = ctx;
        }
        /// <summary>
        /// Create vendor and add in database
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public async Task<Vendor> CreateAsync(Vendor entity)
        {
                var cat = (await ctx.Vendors.ToListAsync()).Where(c => c.Id == entity.Id).FirstOrDefault();
                if (cat != null)
                    throw new Exception($"CatedoryId : {entity.Id} is already exist");
                var record = await ctx.Vendors.AddAsync(entity);
                await ctx.SaveChangesAsync();
                return record.Entity;
            
        }

        /// <summary>
        /// Delete vendor from database
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Vendor> DeleteAsync(int id)
        {
                var record = await ctx.Vendors.FindAsync(id);
                if (record == null)
                    throw new Exception("Record is not found");
                ctx.Vendors.Remove(record);
                await ctx.SaveChangesAsync();
                return record;
            
        }

        /// <summary>
        /// Get all vendors from database
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<Vendor>> GetAsync()
        {
            return (await ctx.Vendors.ToListAsync()).OrderByDescending(v => v.Id);
        }

        /// <summary>
        /// Get a specific vendor by id from database
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Vendor> GetAsync(int id)
        {
                var record = await ctx.Vendors.FindAsync(id);
                if (record == null)
                    throw new Exception("Record not found");
                return record;
        }

        /// <summary>
        /// Update vendor by id in database
        /// </summary>
        /// <param name="id"></param>
        /// <param name="entity"></param>
        /// <returns></returns>
        public async Task<Vendor> UpdateAsync(int id, Vendor entity)
        {
                var record = await ctx.Vendors.FindAsync(id);
                if (record == null)
                    throw new Exception("Record not found");
                record.ContactNo = entity.ContactNo;
                record.Name = entity.Name;
                record.RegistrationDate = entity.RegistrationDate;
                record.TerminationDate = entity.TerminationDate;
                record.Address = entity.Address;
                await ctx.SaveChangesAsync();
                return record;
        }

        /// <summary>
        /// Provide information of the asset count for each vendor.
        /// </summary>
        /// <returns></returns>
        async Task<IEnumerable> IVendorService<Vendor, int>.GetVendorsData()
        {
            ///Get all vendors
            var vendors = await ctx.Vendors.ToListAsync();
            ///Get all assets
            var assets = await ctx.AssetDetails.ToListAsync();
            ///Use a join where we compare the vendor's ID to the asset's vendor ID.
            var assetlist = from v in vendors
                            join a in assets on v.Id equals a.VendorId
                            select new
                            {
                                v.Name,
                                a
                            };
            ///assetList contains the vendor's name and information about their assets.
            ///Hence, group those assets with the same vendor.
            var status = from asset in assetlist
                         group asset by asset.Name into grp
                         select new
                         {
                             name = grp.Key,
                             count = grp.Count(),
                         };
            ///return a list of items with the vendor's name and the total value of his assets.
            return status.ToList();
        }


    }
}

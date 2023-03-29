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
            try
            {
                var cat = (await ctx.Vendors.ToListAsync()).Where(c => c.Id == entity.Id).FirstOrDefault();
                if (cat != null)
                    throw new Exception($"CatedoryId : {entity.Id} is already exist");
                var record = await ctx.Vendors.AddAsync(entity);
                await ctx.SaveChangesAsync();
                return record.Entity;
            }
            catch (Exception)
            {

                throw;
            }
        }

        /// <summary>
        /// Delete vendor from database
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Vendor> DeleteAsync(int id)
        {
            try
            {
                var record = await ctx.Vendors.FindAsync(id);
                if (record == null)
                    throw new Exception("Record is not found");
                ctx.Vendors.Remove(record);
                await ctx.SaveChangesAsync();
                return record;
            }
            catch (Exception)
            {
                throw;
            }
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
            try
            {
                var record = await ctx.Vendors.FindAsync(id);
                if (record == null)
                    throw new Exception("Record not found");
                return record;
            }
            catch (Exception)
            {

                throw;
            }
        }

        /// <summary>
        /// Update vendor by id in database
        /// </summary>
        /// <param name="id"></param>
        /// <param name="entity"></param>
        /// <returns></returns>
        public async Task<Vendor> UpdateAsync(int id, Vendor entity)
        {
            try
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
            catch (Exception)
            {

                throw;
            }
        }

        async Task<IEnumerable> IVendorService<Vendor, int>.GetVendorsData()
        {
            var vendors = await ctx.Vendors.ToListAsync();
            var assets = await ctx.AssetDetails.ToListAsync();
            var assetlist = from v in vendors
                            join a in assets on v.Id equals a.VendorId
                            select new
                            {
                                v.Name,
                                a
                            };
            var status = from asset in assetlist
                         group asset by asset.Name into grp
                         select new
                         {
                             name = grp.Key,
                             count = grp.Count(),
                         };
            return status.ToList();
        }


    }
}

using Asset_Management.Models;
using Asset_Management.Services.Interface;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagementUnitTest.Services
{
    public class TempDataOfAssets : IService<AssetDetail, int> , IAssetDetailService<AssetDetail, string>
    {
        private List<AssetDetail> AssetList;
        public TempDataOfAssets()
        {
            AssetList = new List<AssetDetail>()
            {
                new AssetDetail()
                {
                    Id = 1,
                    Tyape = "DELL",
                    Name = "Dell" ,
                    Proprietary = "OWN" ,
                    Configuration = "i5 250GHz" ,
                    ServiceTag = "Nit-Lpt",
                    Model = "Dell" ,
                    HostName = "Admin",
                    Oem  = "YES",
                    ExpiryDate = DateTime.Now,
                    Owner = "Admin",
                    Remarks = "Good" ,
                    Ram = "12Gb",
                    VendorId = 1
                },
                new AssetDetail()
                {
                    Id = 2,
                    Tyape = "MAc",
                    Name = "mac" ,
                    Proprietary = "OWN" ,
                    Configuration = "i5 250GHz" ,
                    ServiceTag = "Nit-Mac",
                    Model = "mac" ,
                    HostName = "Admin",
                    Oem  = "NO",
                    ExpiryDate = DateTime.Now,
                    Owner = "Admin",
                    Remarks = "Better" ,
                    Ram = "36Gb",
                    VendorId = 1
                }
            };
        }

        public Task<AssetDetail> CreateAsync(AssetDetail entity)
        {
            AssetList.Add(entity);
            return Task.FromResult(entity);
        }

        public Task<AssetDetail> DeleteAsync(int id)
        {
            var result = AssetList.Where(x => x.Id == id).SingleOrDefault();
            if (result == null)
            {
                throw new Exception("Record not found");
            }
            AssetList.Remove(result);
            return Task.FromResult(result);
        }

        public async Task<IEnumerable<AssetDetail>> GetAsync()
        {
            return await Task.FromResult(AssetList);
        }

        public async Task<AssetDetail> GetAsync(int pk)
        {
            var result = AssetList.Where(x => x.Id == pk).SingleOrDefault();
            if(result== null)
            {
                throw new Exception("Record not found");
            }
            return await Task.FromResult(result);
        }

        public Task<AssetDetail> UpdateAsync(int id, AssetDetail entity)
        {
            throw new NotImplementedException();
        }

        Task<IEnumerable<AssetDetail>> IAssetDetailService<AssetDetail, string>.GetassignedAsset()
        {
            throw new NotImplementedException();
        }

        Task<IEnumerable<AssetDetail>> IAssetDetailService<AssetDetail, string>.GetByTypeAsync(string type)
        {
            throw new NotImplementedException();
        }

        Task<IEnumerable<AssetDetail>> IAssetDetailService<AssetDetail, string>.GetByVendorAsync(string vendor)
        {
            throw new NotImplementedException();
        }

        Task<IEnumerable> IAssetDetailService<AssetDetail, string>.GetCountOfAssets()
        {
            throw new NotImplementedException();
        }

        Task<IEnumerable<AssetDetail>> IAssetDetailService<AssetDetail, string>.GetUnassignedAsset()
        {
            throw new NotImplementedException();
        }
    }
}

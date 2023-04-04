using Asset_Management.Models;
using Asset_Management.Services.Interface;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagementUnitTest.Services
{
    public class TempDataOfVendors : IService<Vendor, int>, IVendorService<Vendor, int>
    {
        private List<Vendor> VendorList;

        public TempDataOfVendors()
        {
            VendorList = new List<Vendor>()
            {
                new Vendor()
                {
                    Id = 1,
                    Name = "Test1",
                    Address = "Pune",
                    ContactNo = "1234567890",
                    RegistrationDate= DateTime.Now,
                    TerminationDate= DateTime.Parse("12/12/2024")
                },
                new Vendor()
                {
                    Id = 2,
                    Name = "Test2",
                    Address = "Mumbai",
                    ContactNo = "9876543211",
                    RegistrationDate= DateTime.Now,
                    TerminationDate= DateTime.Parse("11/11/2024")
                }
            };
        }

        public Task<Vendor> CreateAsync(Vendor entity)
        {
            VendorList.Add(entity);
            return Task.FromResult(entity);
        }

        public Task<Vendor> DeleteAsync(int id)
        {
            var result = VendorList.Where(x => x.Id == id).SingleOrDefault();
            if (result == null)
            {
                throw new Exception("Record not found");
            }
            VendorList.Remove(result);
            return Task.FromResult(result);
        }

        public async Task<IEnumerable<Vendor>> GetAsync()
        {
            return await Task.FromResult(VendorList);
        }

        public async Task<Vendor> GetAsync(int pk)
        {
            var result = VendorList.Where(x => x.Id == pk).SingleOrDefault();
            if (result == null)
            {
                throw new Exception("Record not found");
            }
            return await Task.FromResult(result);
        }

        public async Task<Vendor> UpdateAsync(int id, Vendor entity)
        {
            var result = VendorList.Where(x => x.Id == id).SingleOrDefault();
            if (result == null)
            {
                throw new Exception("Record not found");
            }
            result.Name = entity.Name;
            result.Address = entity.Address;
            result.ContactNo = entity.ContactNo;
            result.RegistrationDate = entity.RegistrationDate;
            result.TerminationDate = entity.TerminationDate;
            return await Task.FromResult(result);
        }

        Task<IEnumerable> IVendorService<Vendor, int>.GetVendorsData()
        {
            throw new NotImplementedException();
        }
    }
}

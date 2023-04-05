using Asset_Management.Models;
using Asset_Management.Services.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagementUnitTest.Services
{
    public class TempDataOfAssetTransaction : IService<AssetTransaction, int>, IAssetTransactionService<AssetTransaction, string>
    {
        public List<AssetTransaction> TransactionList;

        public TempDataOfAssetTransaction()
        {
            TransactionList = new List<AssetTransaction>()
            {
                new AssetTransaction()
                {
                    Id = 1,
                    UserId = 1,
                    EmpId = "NIPL-1234",
                    Email = "pratik@nitor.com",
                    UserName = "pratik",
                    Location = "Pune",
                    IssueDate = DateTime.Now,
                    SubmitDate = DateTime.Parse("12/12/2024"),
                    AssetId = 1,
                    IssuedBy = "Admin",
                    Department = "P&D"
                }
            };
        }

        public Task<AssetTransaction> CreateAsync(AssetTransaction entity)
        {
            throw new NotImplementedException();
        }

        public Task<AssetTransaction> DeleteAssetTransactionByAssetId(int id)
        {
            throw new NotImplementedException();
        }

        public Task<AssetTransaction> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<AssetTransaction> getAssetTransactionByEmail(string email)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<AssetTransaction>> GetAsync()
        {
            return await Task.FromResult(TransactionList);
        }

        public Task<AssetTransaction> GetAsync(int pk)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<AssetTransaction>> GetByDeptAsync(string dept)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<AssetTransaction>> GetByLocationtAsync(string location)
        {
            throw new NotImplementedException();
        }

        public Task<AssetTransaction> Search(string search)
        {
            throw new NotImplementedException();
        }

        public Task<AssetTransaction> UpdateAsync(int id, AssetTransaction entity)
        {
            throw new NotImplementedException();
        }
    }
}

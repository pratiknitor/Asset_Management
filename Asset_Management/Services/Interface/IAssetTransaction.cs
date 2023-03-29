using Asset_Management.Models;

namespace Asset_Management.Services.Interface
{
    public interface IAssetTransaction
    {
        AssetTransaction getAssetTransactionByEmail(string email);
    }
}

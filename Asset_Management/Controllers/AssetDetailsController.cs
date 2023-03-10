using Asset_Management.CustomFilters;
using Asset_Management.Models;
using Asset_Management.Services;
using Microsoft.AspNetCore.Mvc;

namespace Asset_Management.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AssetDetailsController : ControllerBase
    {
        IService<AssetDetail, int> assetService;
        IAssetDetailService<AssetDetail, string> assetDetailsService;

        public AssetDetailsController(IService<AssetDetail, int> assetService,IAssetDetailService<AssetDetail,string> assetDetailsService)
        {
            this.assetService = assetService;
            this.assetDetailsService = assetDetailsService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAssets()
        {
            return Ok(await assetService.GetAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAssetById(int id)
        {
            return Ok(await assetService.GetAsync(id));
        }

        [HttpPost]
        public async Task<IActionResult> CreateAsset(AssetDetail assetDetail)
        {
            if (ModelState.IsValid)
            {
                var record = await assetService.CreateAsync(assetDetail);
                return Ok(record);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAsset(int id,AssetDetail assetDetail)
        {
            if (ModelState.IsValid)
            {
                
                return Ok(await assetService.UpdateAsync(id, assetDetail));
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsset(int id)
        {
            if (id > 0 )
            {
                await assetService.DeleteAsync(id);
                return Ok(await assetService.GetAsync());
            }
            else
            {
                return BadRequest("Delete faild");
            }
        }

        [HttpGet]
        [ActionName("GetAssetsByType")]
        public async Task<IActionResult> GetAssetsByType([FromQuery]string type)
        {
            if (type != null)
            {
                return Ok(await assetDetailsService.GetByTypeAsync(type));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet("{vender}")]
        public async Task<IActionResult> GetAssetsByVendor(string vender)
        {
            if (vender != null)
            {
                return Ok(await assetDetailsService.GetByVendorAsync(vender));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAssetCount()
        {
            return Ok(await assetDetailsService.GetCountOfAssets());
        }
    }
}

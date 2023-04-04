using Asset_Management.CustomFilters;
using Asset_Management.Models;
using Asset_Management.Services.Interface;
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
            var result = await assetService.GetAsync();
            return Ok(result);
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
                return BadRequest("Delete failed");
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

        /// <summary>
        /// Count the assets by type.
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAssetCount()
        {
            return Ok(await assetDetailsService.GetCountOfAssets());

        }

        /// <summary>
        /// Get list of unassigned assets
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetUnassignedAsset()
        {
            return Ok(await assetDetailsService.GetUnassignedAsset());
        }

        /// <summary>
        /// Get assigned assets
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAssignedAsset()
        {
            return Ok(await assetDetailsService.GetassignedAsset());
        }
    }
}

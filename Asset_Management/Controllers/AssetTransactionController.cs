using Asset_Management.Models;
using Asset_Management.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Asset_Management.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AssetTransactionController : ControllerBase
    {
        IService<AssetTransaction, int> assetService;
        IAssetDetailService<AssetDetail, string> assetDetailsService;
        IAssetTransactionService<AssetTransaction,string> assetTransactionService;
        public AssetTransactionController(IService<AssetTransaction, int> assetService, IAssetTransactionService<AssetTransaction, string> assetTransactionService, IAssetDetailService<AssetDetail, string> assetDetailsService)
        {
            this.assetService = assetService;
            this.assetTransactionService = assetTransactionService;
            this.assetDetailsService = assetDetailsService;
        }

        [HttpGet("get_all_list")]
        public async Task<IActionResult> GetAllAssetTransaction()
        {
           var result = await assetService.GetAsync();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAssetTransactionById(int id) 
        {
            try
            {
                return Ok(await assetService.GetAsync(id));
            }
            catch (Exception ex)
            {

                return NotFound(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateAssetTransaction( AssetTransaction assetTransaction)
        {
            if(ModelState.IsValid)
            {
                var result = await assetService.CreateAsync(assetTransaction);
                return Ok(result);
            }
            throw new Exception("Please provide correct information");
           
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAssetTransaction(int id, AssetTransaction assetTransaction)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    return Ok(await assetService.UpdateAsync(id, assetTransaction));
                }
                catch (Exception ex)
                {

                    return NotFound(ex.Message);
                }
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpDelete("{id}")] 
        public async Task<IActionResult> DeleteAssetTransaction(int id)
        {
            if (id > 0)
            {
                try
                {
                    await assetService.DeleteAsync(id);
                    return Ok(await assetDetailsService.GetassignedAsset());
                }
                catch (Exception ex)
                {

                    return NotFound(ex.Message);
                }
            }
            else
            {
                return BadRequest("Delete faild");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAssetTransactionByAsset(int id)
        {
            if (id > 0)
            {
                try
                {
                    await assetTransactionService.DeleteAssetTransactionByAssetId(id);
                    return Ok();
                }
                catch (Exception ex)
                {

                    return NotFound(ex.Message);
                }
            }
            else
            {
                return BadRequest("Delete faild");
            }
        }




        [HttpGet("get_by_email/{email}")]
        public async Task<IActionResult> GetByEmail(string email)
        {
            var record = await assetTransactionService.getAssetTransactionByEmail(email);
            if(record != null)
                 return Ok(record);
            return NotFound();
        }

        [HttpGet]
        public async Task<IActionResult> GetByDept([FromQuery]string dept)
        {
            if (dept != null)
            {
                return Ok(await assetTransactionService.GetByDeptAsync(dept));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetByLocation([FromQuery] string location)
        {
            if (location != null)
            {
                return Ok(await assetTransactionService.GetByDeptAsync(location));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet]
        public async Task<IActionResult> Search([FromQuery]string search)
        {
            if (search != null)
            {
                var record = await assetTransactionService.Search(search);
                return Ok(record);
            }
            else
            {
                return BadRequest(string.Empty);
            }
        }

    }
}

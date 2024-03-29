﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Asset_Management.Models;
using Microsoft.AspNetCore.Authorization;
using System.Data;
using Microsoft.Identity.Web.Resource;
using Asset_Management.Services.Interface;

namespace Asset_Management.Controllers
{
    [Route("api/[controller]/[action]")]
    /// USed to Map the Received JSON Data from Http POST and PUT Request to CLR
    /// Object
    [ApiController]
    public class VendorController : Controller
    {
        
        IService<Vendor,int> vendorService;
        IVendorService<Vendor, int> _vService;
        /// <summary>
        /// Dependency injection of service is used
        /// </summary>
        /// <param name="vendorService"></param>
        public VendorController(IService<Vendor, int> vendorService, IVendorService<Vendor,int> vservice)
        {
           this._vService = vservice;
            this.vendorService = vendorService;
        }

        /// <summary>
        /// Call to get all vendors to service layer
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Authorize(Roles = "Manager")]
        [RequiredScope(RequiredScopesConfigurationKey = "AzureAd:scopes")]
        public async Task<IActionResult> GetAllVender()
        {
            var record = await vendorService.GetAsync();
            if(record == null) { return NotFound("Record not found"); }
            return Ok(record);
        }

        /// <summary>
        /// Call to get specific vendor to service layer by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetVenderById(int id)
        {
                var record = await vendorService.GetAsync(id);
                return Ok(record);
        }

        /// <summary>
        /// Call to create vendor to service layer.
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> CrateVender(Vendor data)
        {
            if (ModelState.IsValid)
            {
               

                var record = await vendorService.CreateAsync(data);
               
                return Ok(record);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        /// <summary>
        /// Call to update vendor to service layer.
        /// </summary>
        /// <param name="id"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVender(int id, Vendor data)
        {
            if (ModelState.IsValid)
            { 
                var record = await vendorService.UpdateAsync(id,data);
                
                    return Ok(record);

            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        /// <summary>
        /// Call to delete vendor to service layer.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVender(int id)
        {
            if (id > 0)
            {
                var record = await vendorService.DeleteAsync(id);
           
                return Ok(await vendorService.GetAsync());
            }
            else
            {
                return BadRequest("Delete failed");
            }
        }

        /// <summary>
        /// Provide information of the asset count for each vendor.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetVendorsData()
        {
            return Ok(await _vService.GetVendorsData());
        }
    }
}

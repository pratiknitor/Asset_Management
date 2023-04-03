using Asset_Management.Controllers;
using Asset_Management.Models;
using Asset_Management.Services.Interface;
using AssetManagementUnitTest.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace AssetManagementUnitTest.Controllers
{
    public class AssetDetailControllerTest
    {
        private readonly AssetDetailsController _controller;
        private readonly IService<AssetDetail, int> _service;
        private readonly IAssetDetailService<AssetDetail, string> _assetDetailService;

        public AssetDetailControllerTest()
        {
            _service = new TempDataOfAssets();
            _assetDetailService = new TempDataOfAssets();
            _controller = new AssetDetailsController(_service, _assetDetailService);
        }

        /// <summary>
        /// From here we are testing get all asset method
        /// </summary>
        [Fact]
        public async void GetAllAssets_ReturnOkResult()
        {
            //Act
            var Ok_Result = await _controller.GetAllAssets();

            
            //Assert
            Assert.IsType<OkObjectResult>(Ok_Result as OkObjectResult);
            
        }

        [Fact]
        public async void GetAllAssets_ReturnAllItems()
        {
            //Act
            var Ok_Result = await _controller.GetAllAssets() as OkObjectResult;


            //Assert
            var items = Assert.IsType<List<AssetDetail>>(Ok_Result.Value);
            Assert.Equal(2, items.Count);
        }
        /// <summary>
        /// From here we are testing get asset by id method
        /// </summary>
        [Fact]
        public async void GetAssetById_ReturnNotFound()
        {
            //Act
            var ex = Assert.ThrowsAsync<Exception>(async () => await _controller.GetAssetById(0));
            //Assert
            Assert.Equal("Record not found", ex.Result.Message);
        }

        [Fact]
        public async void GetAssetById_ReturnOkResult()
        {
            //Act
            var OkResult = await _controller.GetAssetById(1);
            //Assert
            Assert.IsType<OkObjectResult>(OkResult as OkObjectResult);
        }

        [Fact]
        public async void GetAssetById_ReturnRightResult()
        {
            //Arrange
            int id = 1;
            //Act
            var OkResult = await _controller.GetAssetById(id) as OkObjectResult;
            //Assert
            Assert.IsType<AssetDetail>(OkResult.Value);
            Assert.Equal(id, (OkResult.Value as AssetDetail).Id);
        }

        /// <summary>
        /// From here we are testing add asset method
        /// </summary>
        [Fact]
        public async void CreateAsset_ReturnBadRequest()
        {
            //Arrange
            var TypeMissingItem = new AssetDetail()
            {
                Id = 3,
                //Tyape = "Laptop",
                Name = "Lenovo",
                Proprietary = "OWN",
                Configuration = "i5 250GHz",
                ServiceTag = "Nit-Levo",
                Model = "Lenovo",
                HostName = "Admin",
                Oem = "YES",
                ExpiryDate = DateTime.Now,
                Owner = "Admin",
                Remarks = "Good",
                Ram = "24Gb",
                VendorId = 1
            };
            _controller.ModelState.AddModelError("Tyape", "Required");

            //Act
            var BadResponse = await _controller.CreateAsset(TypeMissingItem);

            //Assert
            Assert.IsType<BadRequestObjectResult>(BadResponse);
        }

        [Fact]
        public async void CreateAsset_CreatedResponce()
        {
            //Arrange
            var TestItem = new AssetDetail()
            {
                Id = 3,
                Tyape = "Laptop",
                Name = "Lenovo",
                Proprietary = "OWN",
                Configuration = "i5 250GHz",
                ServiceTag = "Nit-Levo",
                Model = "Lenovo",
                HostName = "Admin",
                Oem = "YES",
                ExpiryDate = DateTime.Now,
                Owner = "Admin",
                Remarks = "Good",
                Ram = "24Gb",
                VendorId = 1
            };

            //Act
            var CreatedResponse = await _controller.CreateAsset(TestItem);

            //Assert
            Assert.IsType<OkObjectResult>(CreatedResponse);
        }

        [Fact]
        public async void CreateAsset_ResponceIsSameAsSend()
        {
            //Arrange
            var TestItem = new AssetDetail()
            {
                Id = 3,
                Tyape = "Laptop",
                Name = "Lenovo",
                Proprietary = "OWN",
                Configuration = "i5 250GHz",
                ServiceTag = "Nit-Levo",
                Model = "Lenovo",
                HostName = "Admin",
                Oem = "YES",
                ExpiryDate = DateTime.Now,
                Owner = "Admin",
                Remarks = "Good",
                Ram = "24Gb",
                VendorId = 1
            };

            //Act
            var CreatedResponse = await _controller.CreateAsset(TestItem)as OkObjectResult;
            var asset = CreatedResponse.Value as AssetDetail;

            //Assert
            Assert.IsType<AssetDetail>(asset);
            Assert.Equal("Lenovo", asset.Name);
        }

        /// <summary>
        /// From here we are testing remove asset method
        /// </summary>
        [Fact]
        public async void DeleteAsset_ReturnBadRequest()
        {
            //Act
            var BadResult = await _controller.DeleteAsset(-11);
            //Assert
            Assert.IsType<BadRequestObjectResult>(BadResult as BadRequestObjectResult);
        }

        [Fact]
        public async void DeleteAsset_ExceptionResult()
        {
            //Act
            var ex = Assert.ThrowsAsync<Exception>(async () => await _controller.DeleteAsset(12));
            //Assert
            Assert.Equal("Record not found", ex.Result.Message);
        }
        [Fact]
        public async void DeleteAsset_ReturnResult()
        {
            //Act
            var OkResult = await _controller.DeleteAsset(1) as OkObjectResult;
            var count = Assert.IsType<List<AssetDetail>>(OkResult.Value).Count();
            //Assert
            Assert.Equal(1, count);
        }
    }
}

using Asset_Management.Controllers;
using Asset_Management.Models;
using Asset_Management.Services.Interface;
using AssetManagementUnitTest.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AssetManagementUnitTest.Controllers
{
    public class VendorsControllerTest
    {
        private readonly VendorController _VendorController;
        private readonly IService<Vendor, int> _Service;
        private readonly IVendorService<Vendor, int> _vendorService;

        public VendorsControllerTest()
        {
            _Service = new TempDataOfVendors();
            _vendorService = new TempDataOfVendors();
            _VendorController = new VendorController(_Service, _vendorService);
        }

        /// <summary>
        /// From here we are testing get all Vendors method
        /// </summary>
        [Fact]
        public async void GetAllVendors_ReturnOkResult()
        {
            //Act
            var Ok_Result = await _VendorController.GetAllVender();


            //Assert
            Assert.IsType<OkObjectResult>(Ok_Result as OkObjectResult);

        }

        [Fact]
        public async void GetAllVendors_ReturnAllItems()
        {
            //Act
            var Ok_Result = await _VendorController.GetAllVender() as OkObjectResult;


            //Assert
            var items = Assert.IsType<List<Vendor>>(Ok_Result.Value);
            Assert.Equal(2, items.Count);
        }
        /// <summary>
        /// From here we are testing get vendor by id method
        /// </summary>
        [Fact]
        public async void GetVendorById_ReturnNotFound()
        {
            //Act
            var ex = Assert.ThrowsAsync<Exception>(async () => await _VendorController.GetVenderById(0));
            //Assert
            Assert.Equal("Record not found", ex.Result.Message);
        }

        [Fact]
        public async void GetVendorById_ReturnOkResult()
        {
            //Act
            var OkResult = await _VendorController.GetVenderById(1);
            //Assert
            Assert.IsType<OkObjectResult>(OkResult as OkObjectResult);
        }

        [Fact]
        public async void GetVendorById_ReturnRightResult()
        {
            //Arrange
            int id = 1;
            //Act
            var OkResult = await _VendorController.GetVenderById(id) as OkObjectResult;
            //Assert
            Assert.IsType<Vendor>(OkResult.Value);
            Assert.Equal(id, (OkResult.Value as Vendor).Id);
        }

        /// <summary>
        /// From here we are testing add vendor method
        /// </summary>
        [Fact]
        public async void CreateVendor_ReturnBadRequest()
        {
            //Arrange
            var TypeMissingItem = new Vendor()
            {
                Id = 3,
                //Name = "Test3",
                Address = "Pune",
                ContactNo = "1234567890",
                RegistrationDate = DateTime.Now,
                TerminationDate = DateTime.Parse("12/12/2024")
            };
            _VendorController.ModelState.AddModelError("Name", "Required");

            //Act
            var BadResponse = await _VendorController.CrateVender(TypeMissingItem);

            //Assert
            Assert.IsType<BadRequestObjectResult>(BadResponse);
        }

        [Fact]
        public async void CreateVendor_CreatedResponce()
        {
            //Arrange
            var TestItem = new Vendor()
            {
                Id = 3,
                Name = "Test3",
                Address = "Pune",
                ContactNo = "1234567890",
                RegistrationDate = DateTime.Now,
                TerminationDate = DateTime.Parse("12/12/2024")
            };

            //Act
            var CreatedResponse = await _VendorController.CrateVender(TestItem);

            //Assert
            Assert.IsType<OkObjectResult>(CreatedResponse);
        }

        [Fact]
        public async void CreateVendor_ResponceIsSameAsSend()
        {
            //Arrange
            var TestItem = new Vendor()
            {
                Id = 3,
                Name = "Test3",
                Address = "Pune",
                ContactNo = "1234567890",
                RegistrationDate = DateTime.Now,
                TerminationDate = DateTime.Parse("12/12/2024")
            };

            //Act
            var CreatedResponse = await _VendorController.CrateVender(TestItem) as OkObjectResult;
            var vendor = CreatedResponse.Value as Vendor;

            //Assert
            Assert.IsType<Vendor>(vendor);
            Assert.Equal("Test3", vendor.Name);
        }

        /// <summary>
        /// From here we are testing remove vendor method
        /// </summary>
        [Fact]
        public async void DeleteVendor_ReturnBadRequest()
        {
            //Act
            var BadResult = await _VendorController.DeleteVender(-11);
            //Assert
            Assert.IsType<BadRequestObjectResult>(BadResult as BadRequestObjectResult);
        }

        [Fact]
        public async void DeleteVendor_ExceptionResult()
        {
            //Act
            var ex = Assert.ThrowsAsync<Exception>(async () => await _VendorController.DeleteVender(12));
            //Assert
            Assert.Equal("Record not found", ex.Result.Message);
        }
        [Fact]
        public async void DeleteVendor_ReturnResult()
        {
            //Act
            var OkResult = await _VendorController.DeleteVender(1) as OkObjectResult;
            var count = Assert.IsType<List<Vendor>>(OkResult.Value).Count();
            //Assert
            Assert.Equal(1, count);
        }

        /// <summary>
        /// From here we are testing update vendor method
        /// </summary>
        [Fact]
        public async void UpdateVendor_ReturnBadRequest()
        {
            //Arrange
            int id = 2;
            var TypeMissingItem = new Vendor()
            {
                //Name = "Test3",
                Address = "Pune",
                ContactNo = "1234567890",
                RegistrationDate = DateTime.Now,
                TerminationDate = DateTime.Parse("12/12/2024")
            };
            _VendorController.ModelState.AddModelError("Name", "Required");
            //Act
            var BadResult = await _VendorController.UpdateVender(id, TypeMissingItem);
            //Assert
            Assert.IsType<BadRequestObjectResult>(BadResult as BadRequestObjectResult);
        }

        [Fact]
        public async void UpdateVendor_ExceptionResult()
        {
            //Arrange
            int id = 22;
            var ven = new Vendor()
            {
                //Name = "Test3",
                Address = "Pune",
                ContactNo = "1234567890",
                RegistrationDate = DateTime.Now,
                TerminationDate = DateTime.Parse("12/12/2024")
            };
            //Act
            var ex = Assert.ThrowsAsync<Exception>(async () => await _VendorController.UpdateVender(id,ven));
            //Assert
            Assert.Equal("Record not found", ex.Result.Message);
        }

        [Fact]
        public async void UpdateVendor_OkResult()
        {
            //Arrange
            int id = 2;
            var ven = new Vendor()
            {
                Name = "Test Update",
                Address = "Pune",
                ContactNo = "1234567890",
                RegistrationDate = DateTime.Now,
                TerminationDate = DateTime.Parse("12/12/2024")
            };
            //Act
            var UpdateResponse = await _VendorController.UpdateVender(id, ven) as OkObjectResult;
            var vendor = UpdateResponse.Value as Vendor;

            //Assert
            Assert.IsType<Vendor>(vendor);
            Assert.Equal("Test Update", vendor.Name);
        }

        /// <summary>
        /// From here we are testing asset count for each vendor.
        /// </summary>
        [Fact]
        public async void GetVendorsData_OkResult()
        {
            //Act
            var Ok_Result = await _VendorController.GetVendorsData();


            //Assert
            Assert.IsType<OkObjectResult>(Ok_Result as OkObjectResult);
        }

    }
}

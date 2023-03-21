import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from 'src/app/services/application.service';
import { IVendor } from 'src/app/dashboard/Models/ivendor';
import { NgConfirmService } from 'ng-confirm-box';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css'],
})
export class VendorsComponent implements OnInit {
  vendors!: IVendor;
  searchText!: string;
  error: any = {};
  readioSelected: any = null;

  constructor(
    private dashboardService: ApplicationService,
    private router: Router,
    private confirmService: NgConfirmService
  ) {
    this.readioSelected = null;
  }

  ngOnInit(): void {
    /**
     * Get all vendors
     */
    this.dashboardService.getVendors().subscribe(
      (res) => {
        this.vendors = res;
      },
      (err) => {}
    );
  }

  /**
   * To delete specific vendorby id
   */
  deleteVender(data: number) {
    this.confirmService.showConfirm("Are you sure want to Delete?",
      () => {
        this.dashboardService.deleteVender(data).subscribe(
          (res) => {
            this.vendors = res;
          },
          (err) => {
            alert('Failed to delete !!');
          }
        );
     },
     () => {
      
     })
  }

  /**
   * Edit vendor details
   * @param id send this id to route
   */
  editVendor(id: number) {
    this.router.navigate(['/dashboard/edit-vendor', id]);
  }

  /**
   * To delete specific vendorby id
   */
  commonDeleteVender() {
    if (this.readioSelected == null) {
      alert('Please select a vendor first!!!!');
    } else {
      this.confirmService.showConfirm("Are you sure want to Delete?",
      () => {
        this.dashboardService.deleteVender(this.readioSelected).subscribe(
          (res) => {
            this.readioSelected = null;
            this.vendors = res;
          },
          (err) => {
            alert('Failed to delete !!');
          }
        );
     },
     () => {
      
     })
    }
  }

  /**
   * Edit vendor details
   */
  commonEditVendor() {
    if (this.readioSelected == null) {
      alert('Please select a vendor first!!!!');
    } else {
      var id = this.readioSelected;
      this.router.navigate(['/dashboard/edit-vendor', id]);
    }
  }
}

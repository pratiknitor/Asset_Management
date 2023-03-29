import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from 'src/app/services/application.service';
import { IVendor } from 'src/app/dashboard/Models/ivendor';
import { NgConfirmService } from 'ng-confirm-box';
import { NotificationService } from '@progress/kendo-angular-notification';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css'],
})
export class VendorsComponent implements OnInit {
  vendors!: IVendor;
  searchText!: string;
  error: any = {};
  readioSelected: any = null; //get value of readio button

  constructor(
    private dashboardService: ApplicationService,
    private router: Router,
    private confirmService: NgConfirmService,
    public notifiService: NotificationService
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
   * (old method)
   * To delete specific vendorby id
   */
  deleteVender(data: number) {
    this.confirmService.showConfirm(
      'Are you sure want to Delete?',
      () => {
        this.dashboardService.deleteVender(data).subscribe(
          (res) => {
            this.vendors = res;
            this.showInfo('Vendor deleted successfully !!');
          },
          (err) => {
            this.showError('Unable to delete vendor !!');
          }
        );
      },
      () => {}
    );
  }

  /**
   * (old method)
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
      this.showWarning('Please select a vendor first !!!!');
    } else {
      this.confirmService.showConfirm(
        'Are you sure want to Delete?',
        () => {
          this.dashboardService.deleteVender(this.readioSelected).subscribe(
            (res) => {
              this.readioSelected = null;
              this.vendors = res;
              this.showInfo('Vendor deleted successfully !!');
            },
            (err) => {
              this.showError('Unable to delete vendor from list !!');
            }
          );
        },
        () => {}
      );
    }
  }

  /**
   * Edit vendor details
   */
  commonEditVendor() {
    if (this.readioSelected == null) {
      this.showWarning('Please select a vendor first !!!!');
    } else {
      var id = this.readioSelected;
      this.router.navigate(['/dashboard/edit-vendor', id]);
    }
  }

  /**
   * Unselect readio selection
   */
  unSelectReadio() {
    this.readioSelected = null;
  }

  /**
   * Show error message after transaction failed.
   */
  public showError(data: string): void {
    this.notifiService.show({
      content: data,
      hideAfter: 3000,
      position: { horizontal: 'center', vertical: 'top' },
      animation: { type: 'slide', duration: 400 },
      type: { style: 'error', icon: true },
      width: 350,
      height: 45,
    });
  }

  /**
   * Show warning message for transaction.
   */
  public showWarning(data: string): void {
    this.notifiService.show({
      content: data,
      hideAfter: 2500,
      position: { horizontal: 'center', vertical: 'top' },
      animation: { type: 'fade', duration: 400 },
      type: { style: 'warning', icon: true },
      height: 40,
    });
  }

  /**
   * Show information message for transaction.
   */
  public showInfo(data: string): void {
    this.notifiService.show({
      content: data,
      hideAfter: 2500,
      position: { horizontal: 'center', vertical: 'top' },
      animation: { type: 'slide', duration: 400 },
      type: { style: 'info', icon: true },
      height: 40,
    });
  }
}

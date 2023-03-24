import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApplicationService } from 'src/app/services/application.service';
import { IVendor } from 'src/app/dashboard/Models/ivendor';
import { DatePipe, formatDate } from '@angular/common';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '@progress/kendo-angular-notification';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.css'],
})
export class AddVendorComponent implements OnInit {
  //boolean flag
  updateflag: boolean = false;
  id!: number;

  vendor: IVendor = {
    id: 0,
    name: '',
    contactNo: '',
    address: '',
    registrationDate: formatDate(new Date(), 'yyyy-MM-dd', 'en_US').toString(),
    terminationDate: '',
  };

  constructor(
    private dashboardService: ApplicationService,
    private router: Router,
    private route: ActivatedRoute,
    private datepipe: DatePipe,
    private formBuilder: FormBuilder,
    public notifiService: NotificationService
  ) {}

  ngOnInit(): void {
    /**
     * Find Id in route parameter.
     */
    this.id = this.route.snapshot.params['id'];
    /**
     * if id is available value is set to false
     * because directly we can not convert number to boolean
     */
    this.updateflag = !this.id;

    if (!this.updateflag) {
      this.dashboardService.getVendor(this.id).subscribe(
        (res: IVendor) => {
          this.vendor = res;
          this.vendor.registrationDate = formatDate(
            this.vendor.registrationDate,
            'yyyy-MM-dd',
            'en_US'
          ).toString();
          this.vendor.terminationDate = formatDate(
            this.vendor.terminationDate,
            'yyyy-MM-dd',
            'en_US'
          ).toString();
        },
        (err) => {
          this.showError(err.code + ' ' + err.errorMsg);
          this.router.navigate(['dashboard/show-venders']);
        }
      );
    }
  }

  /**
   * In this method,
   * If - To submit/add details of new vendor
   * else - To update existing vendor details
   */
  submitVendorDetails() {
    if (this.updateflag) {
      this.dashboardService.addVendor(this.vendor).subscribe((res) => {
        this.showSuccess("'Vendor added successfully to the list !!!!'")
        this.router.navigate(['dashboard/show-venders']);
      });
    } else {
      this.dashboardService
        .editVendor(this.vendor.id, this.vendor)
        .subscribe((res) => {
          this.showSuccess("'Vendor updated successfully !!!!'")
          this.router.navigate(['/dashboard/show-venders']);
        });
    }
  }

  /**
   * Show success message after transaction compliance.
   */
  public showSuccess(data : string): void {
    this.notifiService.show({
      content: data,
      hideAfter: 2500,
      position: { horizontal: 'center', vertical: 'top' },
      animation: { type: 'fade', duration: 400 },
      type: { style: 'success', icon: true },
      height: 40,
    });
  }

  /**
   * Show error message after transaction failed.
   */
  public showError(data : string): void {
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
}

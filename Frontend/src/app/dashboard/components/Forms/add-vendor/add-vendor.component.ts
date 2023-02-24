import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ApplicationService } from 'src/app/services/application.service';
import { IVendor } from 'src/app/dashboard/Models/ivendor';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.css'],
})
export class AddVendorComponent {
  constructor(
    private dashboardService: ApplicationService,
    private router: Router
  ) {}

  vendor: IVendor = {
    id: 0,
    name: '',
    contactNo: '',
    address: '',
    registrationDate: '',
    terminationDate: '',
  };

  submitVendorDetails() {
    this.dashboardService.AddVendor(this.vendor).subscribe(
      (res) => {
        console.log(this.vendor);
        alert('Vendor Added !');
        // this.vendor = res;
        this.router.navigate(['dashboard']);
      },
      (err) => {}
    );
  }
}

import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ApplicationService } from 'src/app/services/application.service';
import { IVendor } from 'src/app/dashboard/Models/ivendor';
import { DatePipe, formatDate } from '@angular/common';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.css'],
})
export class AddVendorComponent implements OnInit {
  updateflag : boolean = false;

  //for reactive form
  vendorForm!: FormGroup;

  constructor(
    private dashboardService: ApplicationService,
    private router: Router,
    private datepipe : DatePipe,
    private formBuilder:FormBuilder
    
  ) {}
  ngOnInit(): void {
    this.dashboardService.emitVendor.subscribe(
      (res) => {
        this.vendor = res;
        this.vendor.registrationDate = formatDate(this.vendor.registrationDate,'yyyy-MM-dd','en_US').toString();
        this.vendor.terminationDate = formatDate(this.vendor.terminationDate,'yyyy-MM-dd','en_US').toString();
        this.updateflag = true;
      }
    )

    //reactive form validation
    this.vendorForm = this.formBuilder.group(
      {
        
        name: ['', [
          Validators.required,
          Validators.minLength(2)
        ]],
        contactNo: ['', [
          Validators.required, 
          Validators.pattern(
          /^((\\+91-?)|0)?[0-9]{10}$/),
        ]],
        address: ['', [
          Validators.required,
          Validators.minLength(4)
        ]],
        terminationDate: ['', [
          Validators.required,
        ]],
      }
    )
  }



  vendor: IVendor = {
    id: 0,
    name: '',
    contactNo: '',
    address: '',
    // registrationDate: this.datepipe.transform(new Date().toString(),'dd/MM/yyyy')?.toString(),
    registrationDate : formatDate(new Date(),'yyyy-MM-dd','en_US').toString(),
    terminationDate: '',
  };

  submitVendorDetails() {
    if(!this.updateflag){
    this.dashboardService.AddVendor(this.vendor).subscribe(
      (res) => {
        console.log(this.vendor);
        alert('Vendor Added Successfully !');
        this.router.navigate(['dashboard/ShowVenders']);
      },
      (err) => {}
    );
  }
  else{
    this.updateflag = false;
    this.dashboardService.EditVendor(this.vendor.id, this.vendor).subscribe((res)=>{
      this.router.navigate(['/dashboard/ShowVenders']);
    });
  }
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
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
  id!: number;

  //for reactive form
vendorReactiveForm!: FormGroup;

  constructor(
    private dashboardService: ApplicationService,
    private router: Router,
    private route: ActivatedRoute,
    private datepipe : DatePipe,
    private formBuilder:FormBuilder
    
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.updateflag = !this.id;
    console.log(this.updateflag)
    if(!this.updateflag){
      this.dashboardService.GetVendor(this.id).subscribe((res:IVendor) => {
        console.log(res);
        this.vendor = res;
        this.vendor.registrationDate = formatDate(this.vendor.registrationDate,'yyyy-MM-dd','en_US').toString();
        this.vendor.terminationDate = formatDate(this.vendor.terminationDate,'yyyy-MM-dd','en_US').toString();
      });
    }
    // this.dashboardService.emitVendor.subscribe(
    //   (res) => {
    //     this.vendor = res;
    //     this.vendor.registrationDate = formatDate(this.vendor.registrationDate,'yyyy-MM-dd','en_US').toString();
    //     this.vendor.terminationDate = formatDate(this.vendor.terminationDate,'yyyy-MM-dd','en_US').toString();
    //     this.updateflag = true;
    //   }
    // )

    //reactive form validation
    this.vendorReactiveForm = this.formBuilder.group(
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
        registrationDate: [formatDate(Date.now(),'yyyy-MM-dd','en_US').toString(), [
          Validators.required,
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
    registrationDate : formatDate(new Date(),'yyyy-MM-dd','en_US').toString(),
    terminationDate: '',
  };


  submitVendorDetails() {
    if(this.updateflag){
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
    this.dashboardService.EditVendor(this.vendor.id, this.vendor).subscribe((res)=>{
      alert('Vendor Updated Successfully !');
      this.router.navigate(['/dashboard/ShowVenders']);
    });
  }
  }
}

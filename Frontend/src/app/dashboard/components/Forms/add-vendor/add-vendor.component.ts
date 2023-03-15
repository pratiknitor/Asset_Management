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

  //boolean flag
  updateflag : boolean = false;
  id!: number;
  //for reactive form
  vendorReactiveForm!: FormGroup;

  vendor: IVendor = {
    id: 0,
    name: '',
    contactNo: '',
    address: '',
    registrationDate : formatDate(new Date(),'yyyy-MM-dd','en_US').toString(),
    terminationDate: '',
  };

  constructor(
    private dashboardService: ApplicationService,
    private router: Router,
    private route: ActivatedRoute,
    private datepipe : DatePipe,
    private formBuilder:FormBuilder
    
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
    if(!this.updateflag){
      this.dashboardService.getVendor(this.id).subscribe(
        (res:IVendor) => {
        this.vendor = res;
        this.vendor.registrationDate = formatDate(this.vendor.registrationDate,'yyyy-MM-dd','en_US').toString();
        this.vendor.terminationDate = formatDate(this.vendor.terminationDate,'yyyy-MM-dd','en_US').toString();
      },
      (err) => {
        alert(err.code+' '+err.errorMsg);
        this.router.navigate(['dashboard/show-venders'])
      }
      );
    }
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

  submitVendorDetails() {
    if(this.updateflag){
    this.dashboardService.addVendor(this.vendor).subscribe(
      (res) => {
        alert('Vendor added successfully !!!!');
        this.router.navigate(['dashboard/show-venders']);
      }
    );
  }
  else{
    this.dashboardService.editVendor(this.vendor.id, this.vendor).subscribe((res)=>{
      alert('Vendor updated successfully !!!!');
      this.router.navigate(['/dashboard/show-venders']);
    });
  }
  }
}

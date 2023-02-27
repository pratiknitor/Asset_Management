import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from 'src/app/services/application.service';
import { IVendor} from 'src/app/dashboard/Models/ivendor';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css']
})
export class VendorsComponent implements OnInit {


  vendors!: IVendor;
  searchText! : string;

  headingArray = ['id', 'name', 'contactNo', 'address', 'registrationDate', 'terminationDate'];
  vendorList: any[] = [];
  tableSize = 2;
  classStyle: string = 'table tableScroll';

  constructor(
    private dashboardService: ApplicationService,
    private router: Router
  ) {}

  error : any = {};

  ngOnInit(): void {
    this.dashboardService.GetVendors().subscribe(
      (res) => {
        this.vendors = res;
        this.vendorList = res;
        console.log(this.vendorList);
      },
      (err) => {
        console.log("Vendors List Error"+JSON.stringify(err));
        this.error = {};
        this.error = err;
        this.error[err.param] = err.msg;
      }
    );
  }

  DeleteVender(data : number){
    this.dashboardService.DeleteVender(data).subscribe(
      (res) => {
        console.log(JSON.stringify(res));
        this.vendors = res
      });
  }

}

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
  error : any = {};
  //For reusable component(Table)
  headingArray = ['id', 'name', 'contactNo', 'address', 'registrationDate', 'terminationDate'];
  vendorList: any[] = [];
  tableSize = 2;
  classStyle: string = 'table tableScroll';

  constructor(
    private dashboardService: ApplicationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dashboardService.GetVendors().subscribe(
      (res) => {
        this.vendors = res;
        this.vendorList = res;
        console.log(this.vendorList);
      },
      (err) => {
        console.log("Vendors List Error"+JSON.stringify(err));
      }
    );
  }

  deleteVender(data : number) {
    if(confirm("Are you sure to delete?")){
      this.dashboardService.DeleteVender(data).subscribe(
        (res) => {
          console.log(JSON.stringify(res));
          this.vendors = res
        },
        (err) =>{
          alert("Failed to delete");
        }
        );
    }
    
  }

  EditVendor(id : number){
    this.router.navigate(['/dashboard/editVendor',id]);
  }

}

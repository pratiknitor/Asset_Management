import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from 'src/app/services/application.service';
import { IVendor } from 'src/app/dashboard/Models/ivendor';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.css'],
})
export class VendorsComponent implements OnInit {
  vendors!: IVendor;
  searchText!: string;
  error: any = {};

  constructor(
    private dashboardService: ApplicationService,
    private router: Router
  ) {}

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
    if (confirm('Are you sure to delete?')) {
      this.dashboardService.deleteVender(data).subscribe(
        (res) => {
          this.vendors = res;
        },
        (err) => {
          alert('Failed to delete !!');
        }
      );
    }
  }

  /**
   * Edit vendor details 
   * @param id send this id to route
   */
  editVendor(id: number) {
    this.router.navigate(['/dashboard/edit-vendor', id]);
  }
}

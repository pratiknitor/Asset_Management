import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { LegendLabelsContentArgs } from '@progress/kendo-angular-charts';
import { ApplicationService } from 'src/app/services/application.service';
import { filter, from } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {
  error: any = {};
  errorMessage!: string;
  assetsCount: any[] = [];
  totalAssets: number = 0;
  totalVendors: number = 0;
  unassignedAssets: number = 0;
  vendorsChartData: any[] = [];
  vendors:any[] = [];
  selectVendor! : string ;

  constructor(private service: ApplicationService, private router: Router) {
    this.labelContent = this.labelContent.bind(this);
    this.service.assetType.next("All");
    this.service.setVendorId.next(0);
  }

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    /**
     * Get specific assets count of all type
     */
    this.service.getAssetsCount().subscribe((res) => {
      this.assetsCount = res;
    });
    this.service.getAssets().subscribe((res) => {
      this.totalAssets = res.length;
    });
    this.service.getVendors().subscribe((res) =>{
      this.totalVendors = res.length;
    });
    this.service.getUnassignedAssets().subscribe((res) => {
        this.unassignedAssets = res.length;
      });
    this.service.getVendorsDetails().subscribe((res) => {
      this.vendorsChartData = res;
    });
    this.service.errorSubject.subscribe((res) => {
      this.error = res;
      this.errorMessage = this.error.statusText;
    });
  }

  public labelContent(args: LegendLabelsContentArgs): string {
    return `${args.dataItem.type}`;
  }

  pieChartEvent(e:any){
    this.service.assetType.next(e.category);
    this.router.navigate(['/dashboard/assets']);
  }

  barChartEvent(e:any){
    this.selectVendor = e.category;
    this.service.getVendors().subscribe((res) => {
      this.vendors = res;
      let x = from(this.vendors).pipe(
        filter(
          (findVendorId) =>
          findVendorId.name.toLowerCase() === this.selectVendor.toLowerCase()
        )
      );
      //subscribe to pipe of filter
      x.subscribe((result) => {
        this.service.setVendorId.next(result.id);
        this.router.navigate(['/dashboard/assets']);
      });
    })
  }
}

import { Component, OnInit, AfterViewInit, ViewChild, ViewContainerRef } from '@angular/core';
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

  @ViewChild("chart", { read: ViewContainerRef, static: true })
  public chartContainer!: ViewContainerRef;

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
    /**
     * Get assets count of all type
     */
    this.service.getAssets().subscribe((res) => {
      this.totalAssets = res.length;
    });
    /**
     * Get vendors count of all
     */
    this.service.getVendors().subscribe((res) =>{
      this.totalVendors = res.length;
    });
    /**
     * Get unassigned assets count of all type
     */
    this.service.getUnassignedAssets().subscribe((res) => {
        this.unassignedAssets = res.length;
    });
    /**
     * Get vendors details
     */
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
  /**
   * Get details of single piece of pie chat.
   * @param e get details from single piece of chart.
   */
  pieChartEvent(e:any){
    this.service.assetType.next(e.category);
    this.router.navigate(['/dashboard/assets']);
  }

  /**
   * Get details of single column of bar chat.
   * @param e get details from single column of chart.
   */
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

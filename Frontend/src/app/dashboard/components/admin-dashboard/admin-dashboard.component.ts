import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ChartOptions, LabelItem } from 'chart.js';
import { ChartData } from 'chart.js/dist/types/index';
import { ApplicationService } from 'src/app/services/application.service';
import { IType } from '../../Models/typeCount';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {
  error: any = {};
  errorMessage!: string;

  //Pie chart data
  public pieChartLabels: string[] = [
    'Chrome',
    'Safari',
    'Firefox',
    'Internet Explorer',
    'Other',
  ];
  public pieChartData: number[] = [40, 20, 20, 10, 10];
  public pieChartType: string = 'pie';

  constructor(private service: ApplicationService) {}

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    /**
     * Get specific assets count of all type
     */
    this.service.getAssetsCount().subscribe((res: IType) => {
      console.log(res);
    });
    this.service.errorSubject.subscribe((res) => {
      this.error = res;
      this.errorMessage = this.error.statusText;
    });
  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
}

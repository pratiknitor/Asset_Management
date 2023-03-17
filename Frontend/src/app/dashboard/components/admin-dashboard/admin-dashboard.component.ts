import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LegendLabelsContentArgs } from '@progress/kendo-angular-charts';
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
  assetsCount: any[] = [];

  constructor(private service: ApplicationService) {
    this.labelContent = this.labelContent.bind(this);
  }

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    /**
     * Get specific assets count of all type
     */
    this.service.getAssetsCount().subscribe((res) => {
      this.assetsCount = res;
    });
    this.service.errorSubject.subscribe((res) => {
      this.error = res;
      this.errorMessage = this.error.statusText;
    });
  }

  public labelContent(args: LegendLabelsContentArgs): string {
    return `${args.dataItem.type}`;
  }
}

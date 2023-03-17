import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LegendLabelsContentArgs } from '@progress/kendo-angular-charts';
import { IntlService } from '@progress/kendo-angular-intl';
import { Observable } from 'rxjs';
import { IType } from 'src/app/Models/typeCount';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public pieData = [
    { category: "0-14", value: 0.2545 },
    { category: "15-24", value: 0.1552 },
    { category: "25-54", value: 0.4059 },
    { category: "55-64", value: 0.0911 },
    { category: "65+", value: 0.0933 },
  ];

  assetsCount: any[]=[];

  constructor(public httpClient:HttpClient) {
    this.labelContent = this.labelContent.bind(this);
  }

  ngOnInit(): void {
    this.getAssetsCount().subscribe((res) => {
      // this.assetsCount = res;
      for (let i = 0; i < res.length; i++) {
        console.log(res[i])
      }
      this.assetsCount = res
      console.log(res.length);
    });
  }

  getAssetsCount(): Observable<any> {
    return this.httpClient.get('api/AssetDetails/GetAssetCount');
  }

  public labelContent(args: LegendLabelsContentArgs): string {
    return `${args.dataItem.type}`;
  }

  public labelContentBar(args: LegendLabelsContentArgs): string {
    return `${args.dataItem.count}`;
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from 'src/app/services/application.service';
import { IAssetTransaction } from '../../../Models/iasset-transaction';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-asset-transaction',
  templateUrl: './asset-transaction.component.html',
  styleUrls: ['./asset-transaction.component.css'],
})
export class AssetTransactionComponent implements OnInit {
  transaction: IAssetTransaction = {
    userId: 0,
    empId: '',
    email: '',
    userName: '',
    location: '',
    issueDate: formatDate(new Date(),'yyyy-MM-dd','en_US').toString(),
    submitDate: null,
    assetId: 0,
    issuedBy: '',
    department: '',
  };
  issuers: any = {};
  assets: any = [];
  constructor(
    private httpClient: HttpClient,
    private dashboardService: ApplicationService,
    private router: Router
  ) {}
  ngOnInit(): void {
    console.log('================================================');
    // this.dashboardService.getUserList().subscribe(
    //   (res) => {
    //     console.log(res);
    //   },
    //   (err) => {}
    // );
    this.dashboardService.GetAssets().subscribe(
      (res) => {
        console.log(res);
        this.assets = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  addAssetTransaction() {
    
    console.log(this.transaction);
    this.dashboardService.assignAsset(this.transaction).subscribe(
      (res) => {
        this.router.navigate([`dashboard`]);
      },
      (error) => console.log(error)
    );
    console.log('in addAssetTransaction method called');
  }
}

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
    issueDate: formatDate(new Date(), 'yyyy-MM-dd', 'en_US').toString(),
    submitDate: null,
    assetId: null,
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
    /**
     * Get details of unassigned assets for dropdown
     */
    this.dashboardService.getUnassignedAssets().subscribe(
      (res) => {
        this.assets = res;
      },
      (err) => {
      }
    );
  }
  
  /**
   * Assign a specific asset to employee
   */
  addAssetTransaction() {
    this.dashboardService.assignAsset(this.transaction).subscribe(
      (res) => {
        this.router.navigate([`/dashboard`]);
      },
      (error) => {}
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from 'src/app/services/application.service';
import { IAssetTransaction } from '../../../Models/iasset-transaction';
import { formatDate } from '@angular/common';
import { NotificationService } from '@progress/kendo-angular-notification';

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
  updateflag: boolean = false;
  id!: number;

  constructor(
    private httpClient: HttpClient,
    private dashboardService: ApplicationService,
    private router: Router,
    private route: ActivatedRoute,
    public notifiService: NotificationService
  ) {}

  ngOnInit(): void {
    /**
     * Find Id in route parameter.
     */
    this.id = this.route.snapshot.params['id'];
    /**
     * if id is available value is set to false
     * because directly we can not convert number to boolean
     */
    this.updateflag = !this.id;
    if(!this.updateflag)
    {
      this.dashboardService.getAsset(this.id).subscribe(
        (res) => {
        },
        (err) => {
          this.showError(err.code + ' ' + err.errorMsg);
          this.router.navigate([`/dashboard/unassigned-assets`]);
        }
      )
      this.transaction.assetId = this.id;
    }
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
        this.showSuccess("Asset assign successfully !!!!")
        this.router.navigate([`/dashboard/unassigned-assets`]);
      },
      (error) => {
        this.showError(error.code + ' ' + error.errorMsg);
      }
    );
  }
  
  
  /**
   * Show success message after transaction compliance.
   */
  public showSuccess(data : string): void {
    this.notifiService.show({
      content: data,
      hideAfter: 2500,
      position: { horizontal: 'center', vertical: 'top' },
      animation: { type: 'fade', duration: 400 },
      type: { style: 'success', icon: true },
      height: 40,
    });
  }
  
  /**
   * Show error message after transaction failed.
   */
  public showError(data : string): void {
    this.notifiService.show({
      content: data,
      hideAfter: 3000,
      position: { horizontal: 'center', vertical: 'top' },
      animation: { type: 'slide', duration: 400 },
      type: { style: 'error', icon: true },
      width: 350,
      height: 45,
    });
  }
}

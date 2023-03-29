import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '@progress/kendo-angular-notification';
import { NgConfirmService } from 'ng-confirm-box';
import { IVendor } from 'src/app/dashboard/Models/ivendor';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-submit-asset',
  templateUrl: './submit-asset.component.html',
  styleUrls: ['./submit-asset.component.css'],
})
export class SubmitAssetComponent implements OnInit {
  assignedAssets: any[] = [];
  readioSelected: any = null; //get value of radio button
  assetTransactionId: number = 0;
  searchText!: string;
  vendors!: IVendor;
  assetTransaction: any[] = [];

  constructor(
    private service: ApplicationService,
    private router: Router,
    private confirmService: NgConfirmService,
    public notifiService: NotificationService
  ) {}

  ngOnInit(): void {
    /**
     * Get assigned asset details
     */
    this.service.getAssignedAssets().subscribe(
      (res) => {
        this.assignedAssets = res;
      },
      (err) => {}
    );
    /**
     * Get vendors details
     */
    this.service.getVendors().subscribe((res) => {
      this.vendors = res;
    });
    /**
     * Get asset transaction details
     */
    this.service.getAssetTransactions().subscribe((res) => {
      this.assetTransaction = res;
      console.log(res);
    });
  }

  /**
   * Submit asset to company
   * asset will go back to unassigned asset
   */
  submitAsset() {
    if (this.readioSelected == null) {
      this.showWarning('Please select an asset first !!!!');
    } else {
      this.confirmService.showConfirm(
        'Are you sure want to Submit?',
        () => {
          this.service
            .deleteAssetTransactionByAssetId(this.readioSelected)
            .subscribe(
              (res) => {
                this.readioSelected = null;
                this.ngOnInit();
                this.showInfo('successfully asset is submited !!');
              },
              (err) => {
                this.showError('Unable to submit Asset !!');
              }
            );
        },
        () => {}
      );
    }
  }

  /**
   * Unselect readio selection
   */
  unSelectReadio() {
    this.readioSelected = null;
  }

  /**
   * Show error message after transaction failed.
   */
  public showError(data: string): void {
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

  /**
   * Show warning message for transaction.
   */
  public showWarning(data: string): void {
    this.notifiService.show({
      content: data,
      hideAfter: 2500,
      position: { horizontal: 'center', vertical: 'top' },
      animation: { type: 'fade', duration: 400 },
      type: { style: 'warning', icon: true },
      height: 40,
    });
  }

  /**
   * Show information message for transaction.
   */
  public showInfo(data: string): void {
    this.notifiService.show({
      content: data,
      hideAfter: 2500,
      position: { horizontal: 'center', vertical: 'top' },
      animation: { type: 'slide', duration: 400 },
      type: { style: 'info', icon: true },
      height: 40,
    });
  }
}

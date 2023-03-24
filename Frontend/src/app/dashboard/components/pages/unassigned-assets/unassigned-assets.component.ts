import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IVendor } from 'src/app/dashboard/Models/ivendor';
import { ApplicationService } from 'src/app/services/application.service';
import { NotificationService } from '@progress/kendo-angular-notification';
import { NgConfirmService } from 'ng-confirm-box';

@Component({
  selector: 'app-unassigned-assets',
  templateUrl: './unassigned-assets.component.html',
  styleUrls: ['./unassigned-assets.component.css']
})
export class UnassignedAssetsComponent implements OnInit {

  unassugnedAssets: any[] = [];
  readioSelected: any = null; //get value of radio button
  searchText!: string;
  vendors!: IVendor;

  constructor(
    private service: ApplicationService,
    private router: Router,
    private confirmService: NgConfirmService,
    public notifiService: NotificationService
  ) {}

  ngOnInit(): void {
    /**
     * Get unassigned asset details
     */
    this.service.getUnassignedAssets().subscribe(
      (res) => {
        this.unassugnedAssets = res;
      },
      (err) => {}
    );
    /**
     * Get vendors details
     */
    this.service.getVendors().subscribe((res) => {
      this.vendors = res;
    });
  }


  assignAsset() {
    if (this.readioSelected == null) {
      this.showWarning('Please select an asset first!!!!');
    } else {
      var id = this.readioSelected;
      this.router.navigate(['/dashboard/asset-transaction', id]);
    }
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

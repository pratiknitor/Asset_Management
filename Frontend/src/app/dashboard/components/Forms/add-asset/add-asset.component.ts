import { JsonpInterceptor } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from 'src/app/services/application.service';
import { IAsset } from '../../../Models/iasset';
import { formatDate } from '@angular/common';
import { NotificationService } from '@progress/kendo-angular-notification';

@Component({
  selector: 'app-add-asset',
  templateUrl: './add-asset.component.html',
  styleUrls: ['./add-asset.component.css'],
})
export class AddAssetComponent implements OnInit {

  vendors: any;
  todayDate: string = formatDate(new Date(), 'yyyy-MM-dd', 'en_US').toString();
  updateflag: boolean = false;
  id!: number;
  asset: IAsset = {
    id: 0,
    tyape: '',
    name: '',
    proprietary: '',
    configuration: '',
    serviceTag: '',
    model: '',
    hostName: '',
    oem: '',
    expiryDate: '',
    owner: '',
    remarks: '',
    ram: '',
    vendorId: 1,
  };

  constructor(
    private dashboardService: ApplicationService,
    private route: ActivatedRoute,
    private router: Router,
    public notifiService: NotificationService
  ) {}

  ngOnInit(): void {
    /**
     * Find Id in route parameter.
     */
    this.id = this.route.snapshot.params['id'];
    /**
     * if id is available value is set to false and then ! is there so value become true
     * this is because directly we can not convert number to boolean directly
     */
    this.updateflag = !!this.id;
    if(this.updateflag){
      this.dashboardService.getAsset(this.id).subscribe((res) => {
        this.asset = res;
        this.asset.expiryDate = formatDate(
          this.asset.expiryDate,
          'yyyy-MM-dd',
          'en_US'
        ).toString();
      },
      (err) => {
        this.showError(err.code + ' ' + err.errorMsg);
        this.router.navigate(['dashboard/assets']);
      })
    }
    this.dashboardService.getVendors().subscribe((res) => {
      this.vendors = res;
    });
  }

  /**
   * In this method,
   * If - To submit/add details of new asset
   * else - To update existing asset
   */
  submitAsset(): void {
    if (!this.updateflag) {
      this.dashboardService.addAsset(this.asset).subscribe((response) => {
        this.showSuccess("'Asset added successfully to the list !!!!'")
        this.router.navigate(['/dashboard/assets']);
      });
    } else {
      this.updateflag = false;
      this.dashboardService
        .editAsset(this.asset.id, this.asset)
        .subscribe((res) => {
          this.showSuccess("'Asset updated successfully in the list !!!!'")
          this.router.navigate(['/dashboard/assets']);
        });
    }
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
      closable: true,
    });
  }
}

import { JsonpInterceptor } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from 'src/app/services/application.service';
import { IAsset } from '../../../Models/iasset';
import { formatDate } from '@angular/common';

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
    vendorId: 0,
  };

  constructor(
    private dashboardService: ApplicationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.updateflag = !!this.id;
    if(this.updateflag){
      this.dashboardService.getAsset(this.id).subscribe((res) => {
        this.asset = res;
      })
    }
    this.dashboardService.getVendors().subscribe((res) => {
      this.vendors = res;
    });
    this.dashboardService.emitAsset.subscribe((res) => {
      this.asset = res;
      this.asset.expiryDate = formatDate(
        this.asset.expiryDate,
        'yyyy-MM-dd',
        'en_US'
      ).toString();
      this.updateflag = true;
    });
  }

  submitAsset(): void {
    if (!this.updateflag) {
      this.dashboardService.addAsset(this.asset).subscribe((response) => {
        this.router.navigate(['/dashboard/assets']);
      });
    } else {
      this.updateflag = false;
      this.dashboardService
        .editAsset(this.asset.id, this.asset)
        .subscribe((res) => {
          this.router.navigate(['/dashboard/assets']);
        });
    }
  }
}

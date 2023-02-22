import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-submit-asset',
  templateUrl: './submit-asset.component.html',
  styleUrls: ['./submit-asset.component.css'],
})
export class SubmitAssetComponent {
  flag: boolean = false;
  transaction!: any;
  email!: string;
  submitDate: Date = new Date();

  constructor(
    private dashboardService: ApplicationService,
    private router: Router
  ) {}
  fetchAssetTransaction() {
    console.log('method called');
    this.dashboardService.getAssetDetailByEmail(this.email).subscribe(
      (res) => {
        console.log(res);
        this.flag = true;
        this.transaction = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  submitAsset() {
    this.transaction.submitDate = new Date();
    this.dashboardService
      .submitAsset(this.transaction, this.transaction.id)
      .subscribe(
        (res) => {
          console.log(res);
          this.router.navigate([`dashboard`]);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}

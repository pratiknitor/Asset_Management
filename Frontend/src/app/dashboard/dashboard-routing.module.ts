import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AddAssetComponent } from './components/Forms/add-asset/add-asset.component';
import { AddVendorComponent } from 'src/app/dashboard/components/Forms/add-vendor/add-vendor.component';
import { AssetTransactionComponent } from './components/Forms/asset-transaction/asset-transaction.component';
import { SubmitAssetComponent } from './components/Forms/submit-asset/submit-asset.component';
import { AssetsComponent } from './components/pages/assets/assets.component';
import { VendorsComponent } from './components/pages/vendors/vendors.component';
import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,canActivate:[MsalGuard]
  },
  {
    path: 'AssetTransaction',
    component: AssetTransactionComponent,canActivate:[MsalGuard]
  },
  {
    path: 'AddAsset',
    component: AddAssetComponent,canActivate:[MsalGuard]
  },
  {
    path: 'Assets',
    component: AssetsComponent,canActivate:[MsalGuard]
  },
  {
    path: 'AddVendor',
    component: AddVendorComponent,canActivate:[MsalGuard]
  },
  {
    path: 'ShowVenders',
    component: VendorsComponent,canActivate:[MsalGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

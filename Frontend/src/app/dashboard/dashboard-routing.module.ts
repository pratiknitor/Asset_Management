import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AddAssetComponent } from './components/Forms/add-asset/add-asset.component';
import { AddVendorComponent } from 'src/app/dashboard/components/Forms/add-vendor/add-vendor.component';
import { AssetTransactionComponent } from './components/Forms/asset-transaction/asset-transaction.component';
import { SubmitAssetComponent } from './components/Forms/submit-asset/submit-asset.component';
import { AssetsComponent } from './components/pages/assets/assets.component';
import { VendorsComponent } from './components/pages/vendors/vendors.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
  },
  {
    path: 'AssetTransaction',
    component: AssetTransactionComponent,
  },
  {
    path: 'AddAsset',
    component: AddAssetComponent,
  },
  {
    path: 'Assets',
    component: AssetsComponent,
  },
  {
    path: 'AddVendor',
    component: AddVendorComponent,
  },
  {
    path: 'ShowVenders',
    component: VendorsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

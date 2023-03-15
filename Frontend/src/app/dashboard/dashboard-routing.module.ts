import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AddAssetComponent } from './components/Forms/add-asset/add-asset.component';
import { AddVendorComponent } from 'src/app/dashboard/components/Forms/add-vendor/add-vendor.component';
import { AssetTransactionComponent } from './components/Forms/asset-transaction/asset-transaction.component';
import { AssetsComponent } from './components/pages/assets/assets.component';
import { VendorsComponent } from './components/pages/vendors/vendors.component';
import { MsalGuard } from '@azure/msal-angular';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,canActivate:[MsalGuard]
  },
  {
    path: 'asset-transaction',
    component: AssetTransactionComponent,canActivate:[MsalGuard]
  },
  {
    path: 'add-asset',
    component: AddAssetComponent,canActivate:[MsalGuard]
  },
  {
    path: 'assets',
    component: AssetsComponent,canActivate:[MsalGuard]
  },
  {
    path: 'add-vendor',
    component: AddVendorComponent,canActivate:[MsalGuard]
  },
  {
    path: 'show-venders',
    component: VendorsComponent,canActivate:[MsalGuard]
  },
  {
    path: 'edit-vendor/:id',
    component: AddVendorComponent,
    canActivate:[MsalGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}

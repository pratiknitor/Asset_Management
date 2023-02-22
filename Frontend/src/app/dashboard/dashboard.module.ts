import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AssetTransactionComponent } from './components/Forms/asset-transaction/asset-transaction.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AddAssetComponent } from './components/Forms/add-asset/add-asset.component';
import { AssetsComponent } from './components/pages/assets/assets.component';

import { SubmitAssetComponent } from './components/Forms/submit-asset/submit-asset.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { VendorsComponent } from './components/pages/vendors/vendors.component';
import { AddVendorComponent } from './components/Forms/add-vendor/add-vendor.component';
import { VendorsNamePipe } from '../shared/custom-pipe/vendors-name.pipe';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AssetTransactionComponent,
    AddAssetComponent,
    AssetsComponent,
    SubmitAssetComponent,
    AddVendorComponent,
    VendorsComponent,
    VendorsNamePipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    DashboardRoutingModule,
  ],
  providers: [],
})
export class DashboardModule {}

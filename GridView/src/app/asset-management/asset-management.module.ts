import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetManagementRoutingModule } from './asset-management-routing.module';
import { ReusableGridTableComponent } from './components/reusable-grid-table/reusable-grid-table.component';
import { VendorsComponent } from './components/vendors/vendors.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { GridModule } from '@progress/kendo-angular-grid';
import { RouterModule } from '@angular/router';
import { AssetsComponent } from './components/assets/assets.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChartsModule } from '@progress/kendo-angular-charts';


@NgModule({
  declarations: [
    ReusableGridTableComponent,
    VendorsComponent,
    AssetsComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    GridModule,
    RouterModule,
    ChartsModule,
    AssetManagementRoutingModule
  ],
  providers: [HttpClient]
})
export class AssetManagementModule { }

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


@NgModule({
  declarations: [
    ReusableGridTableComponent,
    VendorsComponent,
    AssetsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    GridModule,
    RouterModule,
    AssetManagementRoutingModule
  ],
  providers: [HttpClient]
})
export class AssetManagementModule { }

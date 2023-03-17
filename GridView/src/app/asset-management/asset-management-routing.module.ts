import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetsComponent } from './components/assets/assets.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VendorsComponent } from './components/vendors/vendors.component';

const routes: Routes = [
  {
    path : 'vendors',
    component : VendorsComponent
  },
  {
    path : 'assets',
    component : AssetsComponent
  },
  {
    path : 'dashboard',
    component : DashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetManagementRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './core/components/layout/landing/landing.component';
import { Comp1Component } from './core/components/layout/comp1/comp1.component';

const routes: Routes = [
  {
    path:'',
    component : LandingComponent
  },
  {
    path:'comp1',
    component : Comp1Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

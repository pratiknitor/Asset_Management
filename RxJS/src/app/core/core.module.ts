import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './components/layout/landing/landing.component';
import { ApiService } from './services/api.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { Comp1Component } from './components/layout/comp1/comp1.component';
import { FormsModule } from '@angular/forms';
import { ChildComponent } from './components/layout/landing/child/child.component';



@NgModule({
  declarations: [
    LandingComponent,
    Comp1Component,
    ChildComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [ HttpClient ,ApiService,Router],
  exports: [ LandingComponent,Comp1Component],
  
})
export class CoreModule { }

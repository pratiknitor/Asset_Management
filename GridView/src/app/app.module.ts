import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AssetManagementModule } from './asset-management/asset-management.module';
import { RouterModule } from '@angular/router';
import { ChartsModule } from '@progress/kendo-angular-charts';
import 'hammerjs';
import { NotificationModule } from '@progress/kendo-angular-notification';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AssetManagementModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    GridModule,
    BrowserAnimationsModule,
    NotificationModule,
    ChartsModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }

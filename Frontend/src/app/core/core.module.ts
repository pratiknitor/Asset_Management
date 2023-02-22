import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './components/layouts/landing/landing.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { HeaderComponent } from './components/layouts/header/header.component';

@NgModule({
 
  declarations: [
    LandingComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ], exports: [LandingComponent, HeaderComponent, FooterComponent]
})
export class CoreModule {}

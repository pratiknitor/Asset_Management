import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from './components/layouts/landing/landing.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { SidebarComponent } from './components/layouts/sidebar/sidebar.component';

@NgModule({
  declarations: [
    LandingComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    LandingComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
  ],
})
export class CoreModule {}

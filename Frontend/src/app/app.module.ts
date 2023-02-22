import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ApplicationService } from './services/application.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [AppComponent],
  providers: [ApplicationService, HttpClient],
  bootstrap: [AppComponent],
  imports: [BrowserModule, CoreModule, Ng2SearchPipeModule, HttpClientModule, AppRoutingModule],
})
export class AppModule {}

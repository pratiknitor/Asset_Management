import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ApplicationService } from './services/application.service';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { ErrorInterceptor } from './shared/interceptor/error.interceptor';


//get browser information
const IisIE = window.navigator.userAgent.indexOf('MSIE')>-1
|| window.navigator.userAgent.indexOf('Trident/')>-1;

@NgModule({
  declarations: [AppComponent],
  providers: [ApplicationService, HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },MsalGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent, MsalRedirectComponent],
  imports: [BrowserModule, CoreModule,
    Ng2SearchPipeModule, HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MsalModule.forRoot(new PublicClientApplication
      (
        {
          auth:{
            clientId:'934d4c7b-b7f0-45a6-ab74-36a5114f4337',
            redirectUri:'http://localhost:4200',
            authority:'https://login.microsoftonline.com/8c3dad1d-b6bc-4f8b-939b-8263372eced6'
          },
          cache:
          {
            cacheLocation:'localStorage',
            storeAuthStateInCookie:IisIE
          }
        }
      ),
      {
        interactionType:InteractionType.Redirect,
        authRequest:{
          scopes:['user.read']
        }
      },
      {
        interactionType:InteractionType.Redirect,
        protectedResourceMap:new Map(
          [
            ['https://graph.microsoft.com/v1.0/me',['user.Read']],
            ['localhost',['api://dd9aac19-d0bb-47d7-a7a3-f236efb5d79b/api.scope']]
          ]
        )
      }
      )
  ],
})
export class AppModule {}

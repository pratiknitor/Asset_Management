import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RefreshService } from 'src/app/shared/services/refresh.service';
import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  token: any;
  flag: any = false;
  sidebarExpanded = false;
  private readonly _destroy=new Subject<void>();
  userName?:string='';
  constructor(private router:Router,private refreshService:RefreshService,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig:MsalGuardConfiguration,
    private msalBroadCastService:MsalBroadcastService,
    private authService:MsalService,) { }
  
  
  ngOnInit(): void {
    console.log("in ng init")
    // this.refreshService.refreshSubject.subscribe(
    //   (res)=>{
    //     console.log(res);
    //     this.flag = res;
    //   },
    //   (err)=>{
    //     console.log(err+"err");
    //     this.flag = false;
    //   }
    // );

    this.msalBroadCastService.inProgress$.pipe
    (filter((interactionStatus:InteractionStatus)=>
    interactionStatus==InteractionStatus.None),
    takeUntil(this._destroy))
    .subscribe(x=>
      {
        this.flag = this.authService.instance.getAllAccounts().length>0;
        // this.refreshService.refreshSubject.next(this.flag);
        //localStorage.setItem('flag', this.flag);
        
        console.log("In MSAL Pipe : "+this.flag);
      })
  
  }

  ngOnDestroy(): void {
    this._destroy.next(undefined);
    this._destroy.complete();
   }

  login(){
    if(this.msalGuardConfig.authRequest)
    {
      this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest)
      
    }
    else
    {
      this.authService.loginRedirect();
    }
    // this.router.navigate(['/dashboard']);
  }

  logout(){
    console.log("Logout clicked");
    localStorage.clear();
    
    this.router.navigate(['']);
    // this.refreshService.refreshSubject.next(false);
    this.authService.logoutRedirect();
  }

}

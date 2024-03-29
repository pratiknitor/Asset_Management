import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RefreshService } from 'src/app/shared/services/refresh.service';
import {
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalService,
  MSAL_GUARD_CONFIG,
} from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { filter, Subject, takeUntil } from 'rxjs';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  token: any;
  flag: any = false;
  sidebarExpanded = false;
  private readonly _destroy = new Subject<void>();
  userName?: string = '';

  constructor(
    private router: Router,
    private refreshService: RefreshService,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private msalBroadCastService: MsalBroadcastService,
    private authService: MsalService,
    private service: ApplicationService
  ) {}

  ngOnInit(): void {
    /**
     * Azure AD authentication and authorization
     */
    this.msalBroadCastService.inProgress$
      .pipe(
        filter(
          (interactionStatus: InteractionStatus) =>
            interactionStatus == InteractionStatus.None
        ),
        takeUntil(this._destroy)
      )
      .subscribe((x) => {
        this.flag = this.authService.instance.getAllAccounts().length > 0;
      });
  }

  ngOnDestroy(): void {
    this._destroy.next(undefined);
    this._destroy.complete();
  }

  login() {
    if (this.msalGuardConfig.authRequest) {
      this.authService.loginRedirect({
        ...this.msalGuardConfig.authRequest,
      } as RedirectRequest);
    } else {
      this.authService.loginRedirect();
    }
  }

  logout() {
    localStorage.clear();
    this.authService.logoutRedirect();
    this.router.navigate(['/']);
  }

  assets() {
    this.service.assetType.next('All');
    this.service.setVendorId.next(0);
    this.router.navigate(['/dashboard/assets']);
  }
}

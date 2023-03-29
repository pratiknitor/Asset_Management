import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ApplicationService } from 'src/app/services/application.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private service: ApplicationService) {}
  error: any = {};
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err) => {
        this.error = {};

        if (err.status == 403) {
          this.service.errorSubject.next(err);
          alert(
            'This is : ' +
              JSON.stringify(err.statusText) +
              ' Please login by authorized account'
          );
          this.router.navigate(['/dashboard']);
        }

        if (err.status == 504) {
          alert(
            'This is : ' +
              JSON.stringify(err.statusText) +
              ' please have patience'
          );
          this.router.navigate(['']);
        }

        if (err.status == 500) {
          alert(
            'This is : ' +
              JSON.stringify(err.statusText) +
              ' please have patience'
          );
          this.router.navigate(['']);
        }

        return throwError({
          errorMsg: err.error,
          code: err.status,
        });
      })
    );
  }
}

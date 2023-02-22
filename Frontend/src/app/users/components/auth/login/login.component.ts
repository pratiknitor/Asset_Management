import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from 'src/app/services/application.service';
import { RefreshService } from 'src/app/shared/services/refresh.service';
import { ILogin } from 'src/app/users/models/ilogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  error: any = {};
  bool: boolean = false;
  constructor(
    private authService : ApplicationService,
    private router: Router,
    private refreshService: RefreshService
  ) {}

  login: ILogin = {
    Email: '',
    Password: '',
  };
  
  flag: any;
  loginSubmit() {
    this.authService.loginUser(this.login).subscribe(
      (res) => {
        localStorage.setItem('flag', 'true');
        this.flag = localStorage.getItem('flag');
        this.refreshService.refreshSubject.next(this.flag);
        console.log(res);
        this.router.navigate(['/dashboard/']);
      },
      (err) => {
        this.error = {};
        this.bool = true;
        this.error[err.param] = err.msg;
      }
    );
  }
}

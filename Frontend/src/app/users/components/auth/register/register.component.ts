import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from 'src/app/services/application.service';
import { IRegister } from 'src/app/users/models/iregister';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  error: any = {};
  bool: boolean = false;

  //declared a service ref in argu list of constructor
  //ie. dependency injection.
  constructor(private authService: ApplicationService, private router: Router) {}
  register: IRegister = {
    Email: '',
    Password: '',
    confirmPassword: '',
  };

  registerSubmit() {
    console.log(JSON.stringify(this.register));
    try {
      if (this.register.Password === this.register.confirmPassword) {
        this.authService.registerUser(this.register).subscribe(
          (res) => {
            console.log(JSON.stringify(res));

            this.router.navigate(['users/login']);
          },
          (err) => {
            this.error = {};

            this.error[err.param] = err.msg;
          }
        );
      } else {
        this.bool = true;
        //throw this.error.param="Password Not Match";
      }
    } catch (e) {
      this.error = e;
    }

    // this.authService.registerUser(this.register).subscribe(
    //       (res) => {
    //         console.log(JSON.stringify(res));
    //         // localStorage.setItem('token',res.token);
    //         this.router.navigate(['']);
    //       },
    //       (err) => {
    //         this.error = {};

    //         this.error[err.param] = err.msg;
    //       }
    // );
  }
}

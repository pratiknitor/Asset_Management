import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RefreshService } from 'src/app/shared/services/refresh.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router,private refreshService:RefreshService) { }
  token: any;
  flag: any = localStorage.getItem('flag')
  ngOnInit(): void {
    console.log("in ng init")
    this.refreshService.refreshSubject.subscribe(
      (res)=>{
        console.log(res);
        this.flag = res;
      },
      (err)=>{
        console.log(err+"err");
        this.flag = false;
      }
    );  }

  

  // ngOnInit(): void {
  //   this.token = localStorage.getItem('token');
   
  // }

  logout(){
    console.log("Logout clicked");
    localStorage.clear();
    this.refreshService.refreshSubject.next(false);
    this.router.navigate(['']);
  }

}

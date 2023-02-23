import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RefreshService } from 'src/app/shared/services/refresh.service';

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  
  flag: any = (localStorage.getItem('flag')?.toLowerCase() == "true") ? true : false;
  
  constructor(public router:Router,private refreshService:RefreshService){}

  ngOnInit(): void {
    console.log("In Landing Component : "+this.flag);
    // if(!this.flag){
    //   this.refreshService.refreshSubject.subscribe(
    //   (res)=>{
    //     console.log(res);
    //     this.flag = res;
    //   },
    //   (err)=>{
    //     console.log(err+"err");
    //     this.flag = false;
    //   }
    // );}
    // if (this.flag){
    //   this.router.navigate(['/dashboard']);
    // }
  }
  

}

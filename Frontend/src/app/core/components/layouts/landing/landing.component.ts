import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationService } from 'src/app/services/application.service';
import { RefreshService } from 'src/app/shared/services/refresh.service';

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  
  flag: any = (localStorage.getItem('flag')?.toLowerCase() == "true") ? true : false;
  
  constructor(public router:Router){}

  ngOnInit(): void {
    console.log("In Landing Component : "+this.flag);
    
  }
  

}

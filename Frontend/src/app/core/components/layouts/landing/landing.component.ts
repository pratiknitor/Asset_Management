import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  
  flag: any = localStorage.getItem('flag')
  
  constructor(public router:Router){}

  ngOnInit(): void {
    if (this.flag){
      this.router.navigate(['/dashboard']);
    }
  }

}

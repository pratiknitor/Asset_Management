import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrls: ['./comp1.component.css']
})
export class Comp1Component implements OnInit   {
  
  subj : any;
  behSubj : any;
  dollerInRupies : any = 0.012;
  dollerInYen : any = 1.600;
  peso : any = 0.66;
  Pound : any = 0.010;
  Eur : any = 0.011;
  som:any = 137.51;


  
  constructor(private service : ApiService){}

  ngOnInit(): void {
    console.log("in ngOnInit");
    this.service.subject.subscribe((res)=>{
      console.log(JSON.stringify(res))
      this.subj = res;
      
    });
    //BehaviorSubject
    this.service.behaviorSubject.subscribe((res1)=>{
      console.log("From Behavior Subject Result : "+JSON.stringify(res1))
      this.behSubj = res1;
      console.log("From Behavior Subject : "+JSON.stringify(this.behSubj));
    })
  }



}

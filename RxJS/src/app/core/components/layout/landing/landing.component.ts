import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/core/models/iuser';
import { ApiService } from 'src/app/core/services/api.service';
import { ChildComponent } from './child/child.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})

export class LandingComponent implements OnInit, OnChanges, OnDestroy {
staffs : any;
user : IUser = {
  Colour : '',
  Amount : 0,
}

flag : boolean = false;

  constructor(public service : ApiService,private router:Router){}
  ngOnInit(): void {
    console.log("In ngOnChanges of ParentComponent");
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log("In ngOnChanges of ParentComponent");
    }
  ngOnDestroy(): void {
    console.log("In NgOnDestroy of ParentComponent");
    }

  sendSubject(){
    console.log("In Landing : "+this.user);
    this.service.sendSubject(this.user);
    //this.router.navigate(['comp1']);
  }

  userList : IUser[] = [];

  passToChild(){
    this.userList.push(this.user);
    this.user = {
      Amount : 0,
      Colour : ''
    }
  }

  outputMethod(data : IUser){
    this.user = data;
    this.flag = true;
  }
  
  update(){
    this.flag = false;
    this.user = {
      Amount : 0,
      Colour : ''
    }
  }

  @ViewChild('dateOfBirth') dateBirth! : ElementRef;
  @ViewChild('age') CalculatedAge! : ElementRef;
  @ViewChild(ChildComponent,{static:true}) childComp! : ChildComponent;

  CalculateAge(){
    let birthYear = new Date(this.dateBirth.nativeElement.value).getFullYear();
    let currentYear = new Date().getFullYear();
    this.CalculatedAge.nativeElement.value = currentYear - birthYear;
    
  }

}

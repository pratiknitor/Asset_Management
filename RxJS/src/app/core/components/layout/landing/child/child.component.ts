import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { IUser } from 'src/app/core/models/iuser';
import { LandingComponent } from '../landing.component';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit, OnChanges, OnDestroy {
  
  @Input() items : IUser[] = [];
  
  @Output() eventEmit = new EventEmitter<IUser>();


  ngOnInit(): void {
    console.log("In ngOnInit of ChildComponent");
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    console.log("In ngOnChanges of ChildComponent");
    }
  ngOnDestroy(): void {
    console.log("In NgOnDestroy of ChildComponent");
    }

  PassToParent(user: IUser){
    this.eventEmit.emit(user);
  }


  toViewChild(){
    console.log("hi in view child")
  }
}

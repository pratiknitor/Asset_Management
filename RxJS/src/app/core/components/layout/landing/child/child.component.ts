import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IUser } from 'src/app/core/models/iuser';
import { LandingComponent } from '../landing.component';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent {
  @Input() items : IUser[] = [];
  
  @Output() eventEmit = new EventEmitter<IUser>();


  PassToParent(user: IUser){
    this.eventEmit.emit(user);
  }


  toViewChild(){
    console.log("hi in view child")
  }
}

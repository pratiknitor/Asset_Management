import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { IUser } from '../models/iuser';

const headers = {headers:{'Content-Type': 'application/json'}};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  

  public subject = new Subject<IUser>();

  user : IUser = {
    Colour : 'Red',
    Amount : 100,
  }
  public behaviorSubject = new BehaviorSubject<IUser>(this.user);

  sendSubject(data : IUser){
    console.log("In Service : "+data);
    this.subject.next(data);
    this.behaviorSubject.next(data);
  }
}

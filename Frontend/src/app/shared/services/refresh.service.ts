import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RefreshService {
  refreshSubject: Subject<boolean> = new Subject();
  constructor() {}
}

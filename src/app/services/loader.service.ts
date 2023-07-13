import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  visibility: BehaviorSubject<boolean>;

  constructor() {
    this.visibility = new BehaviorSubject<boolean>(false);;
  }

  getVisibility() : Observable<boolean> {
    return this.visibility.asObservable();
  }

  setVisibility(visibility: boolean) {
    this.visibility.next(visibility);
  }
}

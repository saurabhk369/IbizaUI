import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalManagerService {
  private subject = new Subject<any>();

  constructor() { }

  confirm(message: any, yesFn: () => void, noFn: () => void) {
    this.setConfirmation(message, yesFn, noFn);
  }

  private setConfirmation(message: any, yesFn: () => void, noFn: () => void) {
    let that = this;
    this.subject.next({
      data: message,
      yesFn: function () {
        that.subject.next();
        yesFn();
      },
      noFn: function () {
        that.subject.next();
        noFn();
      }
    });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

}

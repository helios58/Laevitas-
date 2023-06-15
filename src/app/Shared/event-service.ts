import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventSubject = new Subject<string>();
  event$ = this.eventSubject.asObservable();

  emitEvent(event: string) {
    this.eventSubject.next(event);
  }
}

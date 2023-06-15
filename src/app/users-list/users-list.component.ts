import {Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import {User} from "../../interfaces/user";
import { Subscription } from 'rxjs'
import {EventService} from "../Shared/event-service";
@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})

export class UsersListComponent implements OnInit, OnChanges  {
  @Input() user:User
  @Input() resetChanges: boolean
  @Output() triggerReload = new EventEmitter<Boolean>();

  event: string;
  private eventSubscription: Subscription;
  constructor(private eventService: EventService) {
    this.eventSubscription = this.eventService.event$.subscribe((event: string) => {
      this.event = event;
      this.handleUser()
    })
  }

  oldExpiernece: number
  experience: number
  id: number
   ngOnInit() {
     this.oldExpiernece = this.user.experience
     this.experience = this.oldExpiernece
     this.id = this.user.id
   }
  ngOnChanges(changes: SimpleChanges) {
    if(changes) {
      this.experience = this.oldExpiernece
    }
  }
  handleUser() {
    const data = JSON.parse(localStorage.getItem('users') || '[]')
    const objectIndex = data.findIndex((obj: any) => obj.id === this.id)
    if (objectIndex !== -1) {
      data[objectIndex].experience = this.experience;
    }
    localStorage.setItem('users', JSON.stringify(data))
  }
  deleteUser() {
    let data = JSON.parse(localStorage.getItem('users') || '[]')
    data = data.filter((item: any) => item.id !== this.id);
    localStorage.setItem('users', JSON.stringify(data))
    this.triggerReload.emit(true)
  }
}

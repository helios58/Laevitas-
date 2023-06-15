import { Component, OnInit  } from '@angular/core';
import users from './../assets/users.json'
import {User} from '../interfaces/user'
import {EventService} from "./Shared/event-service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private eventService: EventService) {}
  users:User[] = users
  resetChanges: boolean
  editId: number
  ngOnInit(): void {
    if (localStorage.getItem('users') === null) {
     localStorage.setItem('users', JSON.stringify(users))
    } else {
      this.users = JSON.parse(localStorage.getItem('users') || '[]')
    }
    this.resetChanges = false
  }
  reset() {
    this.resetChanges = true
    setTimeout(() => {
      this.resetChanges = false
    }, 1000);
  }
  editUser(id: number) {
    this.editId = id
  }
  resetLocalStorage() {
    localStorage.setItem('users', JSON.stringify(users))
    this.users = JSON.parse(localStorage.getItem('users') || '[]')
  }
  saveChanges() {
    this.eventService.emitEvent('Save changes');
  }
  updateUsers() {
    this.users = JSON.parse(localStorage.getItem('users') || '[]')
  }
}

import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Subscription } from 'rxjs'
import {EventService} from "../Shared/event-service";

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnChanges{
  @Output() triggerReload = new EventEmitter<Boolean>();
  @Input() resetChanges: boolean

  event: string;
  private eventSubscription: Subscription;
  constructor(private eventService: EventService) {
    this.eventSubscription = this.eventService.event$.subscribe((event: string) => {
      this.event = event;
      this.handleUser()
    })
  }
  userForm = new FormGroup({
    nom: new FormControl('', Validators.required),
    prenom: new FormControl('', Validators.required),
    experience: new FormControl(0)
  })

  ngOnChanges(changes: SimpleChanges) {
    if(changes) {
      if (changes.resetChanges.previousValue === false) {
        this.userForm.reset()
      }
    }
  }
  handleUser() {
    if(this.userForm.valid){
      let users = JSON.parse(localStorage.getItem('users') || '[]')
      let user = {
        id: Math.random(),
        nom: this.userForm.get('nom')?.value,
        prenom: this.userForm.get('prenom')?.value,
        experience: this.userForm.get('experience')?.value,
      }
      users.push(user)
      localStorage.setItem('users', JSON.stringify(users))
      this.userForm.reset();
      this.reload()
    } else {
      this.userForm.get('nom')?.markAsDirty()
      this.userForm.get('prenom')?.markAsDirty()
    }
  }
  reload() {
    this.triggerReload.emit(true);
  }
}

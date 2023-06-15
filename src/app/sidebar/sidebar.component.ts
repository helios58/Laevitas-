import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms'
import { Subscription } from 'rxjs'
import {EventService} from "../Shared/event-service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnChanges {
  @Output() triggerReload = new EventEmitter<Boolean>();
  @Input() resetChanges: boolean
  @Input() editId: number

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
  })

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      if (typeof changes.resetChanges != "undefined") {
        if (changes.resetChanges.previousValue === false) {
          this.userForm.reset()
        }
      }
      if (typeof changes.editId != "undefined") {
       if(changes.editId.currentValue !== undefined){
        let users = JSON.parse(localStorage.getItem('users') || '[]')
        let index = users.findIndex(((obj: any) => obj.id == this.editId))
         if(index !== -1) {
           this.userForm.controls['nom'].setValue(users[index].nom)
           this.userForm.controls['prenom'].setValue(users[index].prenom)
         }
       }
      }
    }
  }
  handleUser() {
    if(this.userForm.valid){
      const data = JSON.parse(localStorage.getItem('users') || '[]')
      const objectIndex = data.findIndex((obj: any) => obj.id === this.editId)
      if (objectIndex !== -1) {
        data[objectIndex].nom = this.userForm.get('nom')?.value
        data[objectIndex].prenom = this.userForm.get('prenom')?.value
      }
      localStorage.setItem('users', JSON.stringify(data))
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

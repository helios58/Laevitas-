import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import users from './../assets/users.json'
import {User} from '../interfaces/user'
import {EventService} from "./Shared/event-service";
import {
  CdkDragDrop,
  CdkDragEnter,
  CdkDragMove,
  moveItemInArray,
} from '@angular/cdk/drag-drop'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('dropListContainer') dropListContainer?: ElementRef;
  dropListReceiverElement?: HTMLElement;
  dragDropInfo?: {
    dragIndex: number;
    dropIndex: number;
  }

  constructor(private eventService: EventService) {
  }

  users: User[] = users
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

  dragEntered(event: any) {
    const drag = event.item;
    const dropList = event.container;
    const dragIndex = drag.data;
    const dropIndex = dropList.data;

    this.dragDropInfo = {dragIndex, dropIndex};
    console.log('dragEntered', {dragIndex, dropIndex});

    const phContainer = dropList.element.nativeElement;
    const phElement = phContainer.querySelector('.cdk-drag-placeholder');

    if (phElement) {
      phContainer.removeChild(phElement);
      phContainer.parentElement?.insertBefore(phElement, phContainer);

      moveItemInArray(this.users, dragIndex, dropIndex);
    }
  }

  dragMoved(event: any) {
    if (!this.dropListContainer || !this.dragDropInfo) return;

    const placeholderElement =
      this.dropListContainer.nativeElement.querySelector(
        '.cdk-drag-placeholder'
      );

    const receiverElement =
      this.dragDropInfo.dragIndex > this.dragDropInfo.dropIndex
        ? placeholderElement?.nextElementSibling
        : placeholderElement?.previousElementSibling;

    if (!receiverElement) {
      return;
    }

    receiverElement.style.display = 'none';
    this.dropListReceiverElement = receiverElement;
  }

  dragDropped(event: any) {
    if (!this.dropListReceiverElement) {
      return;
    }

    this.dropListReceiverElement.style.removeProperty('display');
    this.dropListReceiverElement = undefined;
    this.dragDropInfo = undefined;
  }
}

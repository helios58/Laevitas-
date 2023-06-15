import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { AppComponent } from './app.component';
import { UsersListComponent } from './users-list/users-list.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CreateFormComponent } from './create-form/create-form.component';
import {ReactiveFormsModule} from '@angular/forms'
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    SidebarComponent,
    CreateFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

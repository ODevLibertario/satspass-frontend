import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {HomePage} from "./home/home.page";
import { EventPage } from './event/event.page';
import {ComponentsModule} from "../../components/components.module";
import {ProfilePage} from "./profile/profile.page";
import {TicketsPage} from "./tickets/tickets.page";

const routes: Routes = [
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'event',
    component: EventPage
  },
  {
    path: 'profile',
    component: ProfilePage
  },
  {
    path: 'tickets',
    component: TicketsPage
  }
];

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule, ReactiveFormsModule,
    ComponentsModule
  ],
  exports: [RouterModule],
  declarations: [HomePage, EventPage, ProfilePage, TicketsPage]
})
export class CustomerModule {}

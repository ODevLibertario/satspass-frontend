import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {HomePage} from "./home/home.page";
import {EventPage} from "./event/event.page";
import {DateTimePickerComponent} from "../../components/date-time-picker/date-time-picker.component";
import {TicketCategoryPage} from "./ticket-category/ticket-category.page";
import {TabsComponent} from "../../components/tabs/tabs.component";
import {ProfilePage} from "./profile/profile.page";

const routes: Routes = [
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'profile',
    component: ProfilePage
  },
  {
    path: 'event',
    component: EventPage
  },
  {
    path: 'event/:eventId',
    component: EventPage
  },
  {
    path: 'ticket-category/:eventId',
    component: TicketCategoryPage
  }
];

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule, ReactiveFormsModule
  ],
  exports: [RouterModule],
  declarations: [HomePage, EventPage, TicketCategoryPage, DateTimePickerComponent, ProfilePage, TabsComponent]
})
export class ManagerModule {}

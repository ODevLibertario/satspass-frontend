import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {HomePage} from "./home/home.page";
import {EventPage} from "./event/event.page";
import {TicketCategoryPage} from "./ticket-category/ticket-category.page";
import {ProfilePage} from "./profile/profile.page";
import {ComponentsModule} from "../../components/components.module";
import {ValidateTicketPage} from "./validate-ticket/validate-ticket.page";

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
    path: 'validate-ticket',
    component: ValidateTicketPage
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
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  exports: [RouterModule],
  declarations: [HomePage, EventPage, TicketCategoryPage, ProfilePage, ValidateTicketPage]
})
export class ManagerModule {}

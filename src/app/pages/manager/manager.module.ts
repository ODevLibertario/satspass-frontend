import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {HomePage} from "./home/home.page";
import {EventPage} from "./event/event.page";
import {DateTimePickerComponent} from "../../components/date-time-picker/date-time-picker.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'event',
    component: EventPage
  },
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
  declarations: [HomePage, EventPage, DateTimePickerComponent]
})
export class ManagerModule {}

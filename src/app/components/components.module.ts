import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DateTimePickerComponent} from "./date-time-picker/date-time-picker.component";
import {TabsComponent} from "./tabs/tabs.component";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";

@NgModule({
  declarations: [DateTimePickerComponent, TabsComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [DateTimePickerComponent, TabsComponent]
})
export class ComponentsModule { }

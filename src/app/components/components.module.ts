import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DateTimePickerComponent} from "./date-time-picker/date-time-picker.component";
import {TabsComponent} from "./tabs/tabs.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {QrCodeModalComponent} from "./qr-code-modal/qr-code-modal.component";
import {QRCodeModule} from "angularx-qrcode";

@NgModule({
  declarations: [DateTimePickerComponent, TabsComponent, QrCodeModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    QRCodeModule
  ],
  exports: [DateTimePickerComponent, TabsComponent, QrCodeModalComponent]
})
export class ComponentsModule { }

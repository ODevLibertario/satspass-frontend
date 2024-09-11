import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SatspassApiService} from "../../../../service/SatspassApiService";
import {ModalService} from "../../../../service/ModalService";
import {DateTimePickerOuput} from "../../../components/date-time-picker/date-time-picker.component";
import {UpsertEventRequest} from "../../../../model/UpsertEventRequest";
import * as moment from "moment";

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage {

  eventForm: FormGroup;
  startDate: DateTimePickerOuput | undefined;
  endDate: DateTimePickerOuput | undefined;
  startTime: DateTimePickerOuput | undefined;
  endTime: DateTimePickerOuput | undefined;

  constructor(private formBuilder: FormBuilder, private router: Router, private satspassApiService: SatspassApiService, private modalService: ModalService) {
    this.eventForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      location: [''],
      publicityImageUrl: ['']
    });

  }

  async onSubmit() {
    console.log("chamou")
    console.log(this.eventForm.valid)
    console.log(this.startDate!.valid)
    console.log(this.endDate!.valid)
    console.log(this.startTime!.valid)
    console.log(this.endTime!.valid)
    if(this.eventForm.valid && this.startDate?.valid && this.endDate?.valid && this.startTime?.valid && this.endTime?.valid) {
      return await this.modalService.wrapInLoading(() => {
        return this.callAddEvent()
      }, 'Evento adicionado com sucesso!', 'Falha ao adicionar evento')
    }
  }

  async callAddEvent() {
    await this.satspassApiService.addEvent(new UpsertEventRequest(
      this.eventForm.value.name,
      moment(this.startDate!.value, 'DD/MM/YYYY').toDate(),
      moment(this.endDate!.value, 'DD/MM/YYYY').toDate(),
      moment(this.startTime!.value, 'HH:mm').toDate(),
      moment(this.endTime!.value, 'HH:mm').toDate(),
      this.eventForm.value.description,
      this.eventForm.value.location,
      this.eventForm.value.publicityImageUrl
    ))

    this.eventForm.reset()
    await this.router.navigate(['/manager/home'])
  }

  navigateToHome() {
    this.router.navigate(['/manager/home']);
  }

  onStartDateChange(event: DateTimePickerOuput) {
    this.startDate = event;
  }

  onEndDateChange(event: DateTimePickerOuput) {
    this.endDate = event;
  }

  onStartTimeChange(event: DateTimePickerOuput) {
    console.log('start time: ' + event)
    this.startTime = event;
  }

  onEndTimeChange(event: DateTimePickerOuput) {
    this.endTime = event;
  }
}

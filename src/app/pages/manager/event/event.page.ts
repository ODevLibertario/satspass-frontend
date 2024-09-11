import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SatspassApiService} from "../../../../service/SatspassApiService";
import {ModalService} from "../../../../service/ModalService";
import {DateTimePickerOuput} from "../../../components/date-time-picker/date-time-picker.component";

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

  constructor(private formBuilder: FormBuilder, private router: Router, private satspassApiService: SatspassApiService, private changeDetectorRef: ChangeDetectorRef, private modalService: ModalService) {
    this.eventForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      location: [''],
      publicityImageUrl: ['']
    });

  }


  onSubmit() {
    console.log(this.eventForm.value)
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
    this.startTime = event;
  }

  onEndTimeChange(event: DateTimePickerOuput) {
    this.endTime = event;
  }
}

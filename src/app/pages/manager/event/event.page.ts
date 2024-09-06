import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SatspassApiService} from "../../../../service/SatspassApiService";

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage {

  eventForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private satspassApiService: SatspassApiService) {
    this.eventForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      location: [''],
      publicityImageUrl: ['']
    });

  }


  onSubmit() {

  }

  navigateToHome() {
    this.router.navigate(['/manager/home']);
  }
}

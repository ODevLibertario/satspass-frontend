import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {SatspassApiService} from "../../../../service/SatspassApiService";
import {Event} from "../../../../model/Event";
import {clamp} from "../../../../util/mathUtils";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  events: Event[] = []
  constructor(private router: Router, private satspassApiService: SatspassApiService) { }

  navigateToEvent() {
    this.router.navigate(['/customer/event']);
  }

  ngOnInit() {
    this.satspassApiService.getCustomerEvents().then(r => {
      this.events = r
      console.log(this.events)
    })
  }

  protected readonly clamp = clamp;
}

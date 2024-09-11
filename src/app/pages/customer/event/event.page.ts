import { Component, OnInit } from '@angular/core';
import {SatspassApiService} from "../../../../service/SatspassApiService";
import {Event} from "../../../../model/Event";

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  event: Event | undefined = undefined;

  constructor(private satspassApiService: SatspassApiService) {

    }



  ngOnInit() {
    this.satspassApiService.getCustomerEvents().then(r => {
      this.event = r[0]
      console.log(this.event)
    })
  }

}



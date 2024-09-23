import { Component, OnInit } from '@angular/core';
import {SatspassApiService} from "../../../../service/SatspassApiService";
import {Event} from "../../../../model/Event";
import {TicketCategory} from "../../../../model/TicketCategory";
import {Router} from "@angular/router";
import {ModalService} from "../../../../service/ModalService";

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  event: Event | undefined = undefined;

  constructor(
    private satspassApiService: SatspassApiService,
    private router: Router,
    private modalService: ModalService) {

  }



  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    this.event = navigation?.extras.state as Event;
  }

}



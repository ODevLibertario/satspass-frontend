import { Component, OnInit } from '@angular/core';
import {SatspassApiService} from "../../../../service/SatspassApiService";
import {Event} from "../../../../model/Event";
import {TicketCategory} from "../../../../model/TicketCategory";

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  event: Event | undefined = undefined;
  ticketCategories: TicketCategory[] = [
    {
      id: '12',
      eventId: '123',
      categoryName: 'VIP',
      price: 500,
      currency: 'USD',
      salesStartDate: new Date('2024-09-01'),
      salesEndDate: new Date('2024-09-30'),
      quantity: 2000
    },
    {
      id: '22',
      eventId: '1031',
      categoryName: 'PISTA',
      price: 200,
      currency: 'USD',
      salesStartDate: new Date('2024-09-01'),
      salesEndDate: new Date('2024-09-30'),
      quantity: 100
    }
  ];

  value: number = 0;

  constructor(private satspassApiService: SatspassApiService) {

    }
  ngOnInit() {
    this.satspassApiService.getCustomerEvents().then(r => {
      this.event = r[0]
    })
  }
  increase() {
    this.value++;
  }

  decrease() {
    if (this.value > 0) {
      this.value--;
    }
  }

  protected readonly TicketCategory = TicketCategory;
}




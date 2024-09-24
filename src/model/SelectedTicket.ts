import {TicketCategory} from "./TicketCategory";

export class SelectedTicket {

  ticketCategory: TicketCategory;
  count: number;

  constructor(ticketCategory: TicketCategory, count: number) {
    this.ticketCategory = ticketCategory;
    this.count = count;
  }

}

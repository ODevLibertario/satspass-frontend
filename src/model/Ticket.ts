export class Ticket {
  ticketId: string;
  categoryName: string;
  qrCode: string;
  invoice: string;
  ticketStatus: string;
  eventName: string;
  eventStartDate: Date;
  eventEndDate: Date;
  eventStartTime: Date;
  eventEndTime: Date;
  eventDescription: string;
  eventLocation: string;
  eventPublicityImageUrl: string;

  constructor(ticketId: string, categoryName: string, qrCode: string, invoice: string, ticketStatus: string, eventName: string, eventStartDate: Date, eventEndDate: Date, eventStartTime: Date, eventEndTime: Date, eventDescription: string, eventLocation: string, eventPublicityImageUrl: string) {
    this.ticketId = ticketId;
    this.categoryName = categoryName;
    this.qrCode = qrCode;
    this.invoice = invoice;
    this.ticketStatus = ticketStatus;
    this.eventName = eventName;
    this.eventStartDate = eventStartDate;
    this.eventEndDate = eventEndDate;
    this.eventStartTime = eventStartTime;
    this.eventEndTime = eventEndTime;
    this.eventDescription = eventDescription;
    this.eventLocation = eventLocation;
    this.eventPublicityImageUrl = eventPublicityImageUrl;
  }
}

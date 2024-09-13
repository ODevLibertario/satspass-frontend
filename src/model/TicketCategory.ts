export class TicketCategory {
  id: string;
  eventId: string;
  categoryName: string;
  price: number;
  currency: string;
  quantity: number;
  salesStartDate: Date;
  salesEndDate: Date;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    id: string,
    eventId: string,
    categoryName: string,
    price: number,
    currency: string,
    quantity: number,
    salesStartDate: Date,
    salesEndDate: Date,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.id = id;
    this.eventId = eventId;
    this.categoryName = categoryName;
    this.price = price;
    this.currency = currency;
    this.quantity = quantity;
    this.salesStartDate = salesStartDate;
    this.salesEndDate = salesEndDate;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

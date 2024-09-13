export class UpsertTicketCategoryRequest {
  categoryName: string;
  price: number;
  currency: string;
  quantity: number;
  salesStartDate: Date;
  salesEndDate: Date;

  constructor(categoryName: string, price: number, currency: string, quantity: number, salesStartDate: Date, salesEndDate: Date) {
    this.categoryName = categoryName;
    this.price = price;
    this.currency = currency;
    this.quantity = quantity;
    this.salesStartDate = salesStartDate;
    this.salesEndDate = salesEndDate;
  }
}

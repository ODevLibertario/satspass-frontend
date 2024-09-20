export class TicketStatistics {
  categoryName: string;
  quantity: number;
  price: number;
  soldCount: number;
  totalValue: number;

  constructor(categoryName: string, quantity: number, price: number, soldCount: number, totalValue: number) {
    this.categoryName = categoryName;
    this.quantity = quantity;
    this.price = price;
    this.soldCount = soldCount;
    this.totalValue = totalValue;
  }
}

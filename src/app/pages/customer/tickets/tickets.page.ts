import {Component, OnInit, ViewChild} from '@angular/core';
import {SatspassApiService} from "../../../../service/SatspassApiService";
import {Ticket} from "../../../../model/Ticket";
import {QrCodeModalComponent} from "../../../components/qr-code-modal/qr-code-modal.component";
import {customerTabs} from "../home/home.page";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage implements OnInit {

  tickets: Ticket[] | undefined;
  selectedTicket: Ticket | undefined;

  @ViewChild(QrCodeModalComponent)
  modal: QrCodeModalComponent | undefined;

  constructor(private satspassApiService: SatspassApiService) { }

  ngOnInit() {
    this.satspassApiService.getTickets().then(tickets => {
      this.tickets = tickets;
    })
  }

  getStatus(ticketStatus: string): string {
    if (ticketStatus == 'RESERVED') {
      return 'Pendente de confirmação'
    }

    if (ticketStatus == 'PURCHASED') {
      return 'Confirmado'
    }

    return ''
  }

  showInvoice(ticket: Ticket) {
    this.modal!.title = 'Invoice'
    this.modal!.warning = 'Verifique na sua carteira lightning se o pagamento já não foi efetuado, a confirmação pode levar alguns minutos'
    this.modal!.qrData = ticket.invoice

    this.modal!.open()
  }

  showQrCode(ticket: Ticket) {
    this.modal!.title = 'QR Code para validação'
    this.modal!.qrData = ticket.qrCode

    this.modal!.open()
  }

  protected readonly customerTabs = customerTabs;
}

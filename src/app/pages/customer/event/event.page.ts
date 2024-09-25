import {Component, OnInit, ViewChild} from '@angular/core';
import {SatspassApiService} from "../../../../service/SatspassApiService";
import {Event} from "../../../../model/Event";
import {Router} from "@angular/router";
import {ModalService} from "../../../../service/ModalService";
import {SelectedTicket} from "../../../../model/SelectedTicket";
import {customerTabs} from "../home/home.page";
import {QrCodeModalComponent} from "../../../components/qr-code-modal/qr-code-modal.component";

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  event: Event | undefined = undefined;
  value: number = 0;
  selectedTickets: SelectedTicket[] = [];
  invoice: string | undefined;
  isModalOpen: boolean = false;

  @ViewChild(QrCodeModalComponent)
  modal: QrCodeModalComponent | undefined;

  constructor(
    private satspassApiService: SatspassApiService,
    private router: Router,
    private modalService: ModalService) {

  }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    this.event = navigation?.extras.state as Event;
    if(this.event.ticketCategories) {
      this.selectedTickets = this.event.ticketCategories.map(ticketCategory => ({ticketCategory, count: 0}))
    }
    this.isModalOpen = false
  }

  increase(selectedTicket: SelectedTicket) {
    selectedTicket.count++;
  }

  decrease(selectedTicket: SelectedTicket) {
    if (selectedTicket.count > 0) {
      selectedTicket.count--;
    }
  }

  getTotalPrice() {
    return this.selectedTickets.map(item => item.ticketCategory.price * item.count).reduce((a, b) => a + b, 0);
  }

  async buy() {
    this.invoice = (await this.modalService.wrapInLoading(() => {
      return this.satspassApiService.buyTickets(this.event!.id, this.selectedTickets)
    },
      'Invoice gerada, efetue o pagamento',
      false,
      'Falha ao gerar invoice')).invoice

    this.modal?.open()
  }

  protected readonly customerTabs = customerTabs;
}



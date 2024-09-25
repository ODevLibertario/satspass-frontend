import {Component, Input, OnInit} from '@angular/core';
import {Clipboard} from "@capacitor/clipboard";
import {ModalService} from "../../../service/ModalService";

@Component({
  selector: 'qr-code-modal',
  templateUrl: './qr-code-modal.component.html',
  styleUrls: ['./qr-code-modal.component.scss'],
})
export class QrCodeModalComponent {

  @Input()
  title: string | undefined;

  @Input()
  qrData: string | undefined;

  @Input()
  warning: string | undefined;

  isModalOpen: boolean = false;

  constructor(private modalService: ModalService) { }

  open() {
    this.isModalOpen = true;
  }

  close() {
    this.isModalOpen = false;
  }

  async copyToClipboard() {
    await Clipboard.write({
      string: this.qrData
    })
    await this.modalService.toast('Copiado com sucesso!')
  }

}

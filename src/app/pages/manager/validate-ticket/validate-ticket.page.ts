import { Component } from '@angular/core';
import {BarcodeFormat, BarcodeScanner} from "@capacitor-mlkit/barcode-scanning";
import {AlertController, Platform} from "@ionic/angular";
import {SatspassApiService} from "../../../../service/SatspassApiService";
import {ModalService} from "../../../../service/ModalService";
import {Ticket} from "../../../../model/Ticket";
import {managerTabs} from "../home/home.page";

@Component({
  selector: 'app-validate-ticket',
  templateUrl: './validate-ticket.page.html',
  styleUrls: ['./validate-ticket.page.scss'],
})
export class ValidateTicketPage {

  ticket: Ticket | undefined;

  constructor(
    private alertController: AlertController,
    private platform: Platform,
    private satspassApiService: SatspassApiService,
    private modalService: ModalService
  ) {}

  async scan(): Promise<void> {
    if(this.platform.is('mobile')) {
      const granted = await this.requestPermissions();
      if (!granted) {
        await this.presentAlert();
        return;
      }
      const { barcodes } = await BarcodeScanner.scan({formats: [BarcodeFormat.QrCode]});
      await this.modalService.wrapInLoading(() => {
        return this.callGetQrCodeInfo(barcodes[0].rawValue)
      }, undefined, true)


    } else {
      const alert = await this.alertController.create({
        header: 'Plataforma inválida',
        message: 'Só é possível ler QR codes a partir de um celular',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  async callGetQrCodeInfo(qrCode: string): Promise<void> {
    this.ticket = await this.satspassApiService.getQrCodeInfo(qrCode)
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permissão negada',
      message: 'Por favor, permita o uso da câmera para leitura de QR code',
      buttons: ['OK'],
    });
    await alert.present();
  }

  cancel() {
    this.ticket = undefined;
  }

  validateTicket(ticketId: string) {
    this.modalService.wrapInLoading(() => {
      return this.callValidateTicket(ticketId)
    }, 'Ingresso validado com sucesso!', true, 'Falha ao validar ingresso')
  }

  async callValidateTicket(ticketId: string) {
    await this.satspassApiService.validateTicket(ticketId)
    this.ticket = undefined
  }

  protected readonly managerTabs = managerTabs;
}

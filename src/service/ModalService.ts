import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LoadingController, ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private toastController: ToastController, private loadingController: LoadingController) {

  }

  async toast(message: string, color = 'success', duration: number = 3000) {
    const toast = await this.toastController.create({ message, duration, position: "bottom", color
    });

    await toast.present();
  }

  async loading(message: string = 'Carregando...') {
    const loading = await this.loadingController.create({ message, backdropDismiss: false, spinner: 'bubbles'
    });

    await loading.present();

    return loading
  }

}

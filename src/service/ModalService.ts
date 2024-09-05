import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {LoadingController, ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private toastController: ToastController, private loadingController: LoadingController) {

  }

  async wrapInLoading(action: () => Promise<any>,
                      successMessage: string | undefined = undefined,
                      failureMessage: string | undefined = undefined,
                      failureAction: (() => Promise<any>) | undefined = undefined) {
    const loading = await this.loading()
    try{
      await action()
      if(successMessage){
        await this.toast(successMessage)
      }
    } catch (error) {
      console.log(error)
      if(failureMessage){
        await this.toast(failureMessage, 'danger')
      }
      if(failureAction){
        await failureAction()
      }
    } finally {
      await loading.dismiss()
    }
  }

  private async toast(message: string, color = 'success', duration: number = 3000) {
    const toast = await this.toastController.create({ message, duration, position: "bottom", color
    });

    await toast.present();
  }

  private async loading(message: string = 'Carregando...') {
    const loading = await this.loadingController.create({ message, backdropDismiss: false, spinner: 'bubbles'
    });

    await loading.present();

    return loading
  }

}

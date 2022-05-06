import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  STORAGE_TOKEN:string = 'app:token-auth';
  REGEX_EMAIL:RegExp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) { }

  async showToast(text = 'Error!') {
    const toast = await this.toastCtrl.create({
      message: text,
      duration: 4000,
      position: 'bottom',
      buttons: ['Ok'],
      color: 'secondary'
    });
    toast.present();
  }

  async showLoading(msg) {
    const loader = await this.loadingCtrl.create({
      message: msg,
    });
    await loader.present();
    return loader;
  }



}

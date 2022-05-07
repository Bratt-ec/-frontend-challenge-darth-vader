import { Component } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(
    private navCtrl: NavController
  ) {}

  async logout(){
    await Storage.clear();
    this.navCtrl.navigateRoot('/login');
  }
}

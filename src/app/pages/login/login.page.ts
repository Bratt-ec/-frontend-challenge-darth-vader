import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInput, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';
import { Storage } from "@capacitor/storage";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  @ViewChild("password", { static: false }) password_input:IonInput;
  logo: string;
  googlePlus: any;
  loginCredentials = { email: '', password: '' };
  constructor(
    private navCtrl: NavController,
    private __global: GlobalService,
    private __auth: AuthService
  ) { }

  ngOnInit() {
  }
  async initVariables() {
    this.loginCredentials = { email: '', password: '' };
    return true;
  }

  nextInput(position) {
    switch (position) {
      case 1:
        this.password_input.setFocus();
        break;

      default:
        this.login(this.loginCredentials);
        break;
    }
  }

  //#region ******** LOGIN FUNCTIONS *******

  login(loginCredentials) {
    loginCredentials.email = loginCredentials.email.split(' ').join('');
    if (loginCredentials.email != '' && loginCredentials.password != '') {
      if (this.__global.REGEX_EMAIL.test(loginCredentials.email)) {
        if(loginCredentials.password.length >= 6){
          this.loginServer(loginCredentials);
        }else{
          this.__global.showToast('Error 001 - Password must be at least 6 characters long');
        }
      } else {
        this.__global.showToast('Error 002 - Email is not valid');
      }
    } else {
      this.__global.showToast('Error 003 - All fields are required');
    }
  }

  async loginServer(loginCredentials:{email:string, password:string}) {
    const loader = await this.__global.showLoading('Wait...');
    try {
      const response:any =  this.__auth.login(loginCredentials);
      if (response.value == 1) {
        await loader.dismiss();
        this.goHome(response);
      }
    } catch (err) {
      await loader.dismiss();
    }
  }

  //#endregion

  async goHome(data:any) {
    await this.initVariables();
    await Storage.set({key:this.__global.STORAGE_TOKEN, value: data.token});
    this.navCtrl.setDirection('root');
    this.navCtrl.navigateRoot('/home/app/countries', { animated: true });
  }
}

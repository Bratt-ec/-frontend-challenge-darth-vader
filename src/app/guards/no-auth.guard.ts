import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(
    private navCtrl: NavController,
    private __auth: AuthService,
  ) {}
  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    try {
      const token:string =  await this.__auth.getTokenAuth();
      if (token == '') {
        return true;
      }else{
        this.navCtrl.navigateRoot('home/app/countries');
        return true;
      }
    } catch (error) {
      console.log('Error AuthGuard:',error);
      return false;
    }
  }
}

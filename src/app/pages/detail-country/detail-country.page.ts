import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CountriesService } from 'src/app/services/countries.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-detail-country',
  templateUrl: './detail-country.page.html',
  styleUrls: ['./detail-country.page.scss'],
})
export class DetailCountryPage implements OnInit {
  holidays: Array<any> = [];
  codeCountry:string = '';
  country:any;

  constructor(
    private navCtrl: NavController,
    private router: ActivatedRoute,
    private __countries: CountriesService,
    private __global: GlobalService,
  ) { }

  async ngOnInit() {
    this.country = this.__countries.getCountrySelected;
    this.codeCountry = this.router.snapshot.paramMap.get('countryCode');
    if(!this.country) {
      try {
        const response:any = await this.__countries.getDetailCountry(this.codeCountry);
        this.country = response.countries[0];
      } catch (error) {
        this.__global.showToast('Error - An error occurred while trying to get the country');
        this.navCtrl.navigateRoot('home/app/countries', { animated: true });
      }
    }
    this.getHolidays(this.codeCountry);
  }

  close(){
    this.navCtrl.navigateRoot('home/app/countries', { animated: true });
  }

  async getHolidays(countryCode:string){
    try {
      const response:any = await this.__countries.getHolidays(countryCode);
      if(response.status == 200){
        this.holidays = response.holidays;
      }else {
        this.__global.showToast('Error 001 -  An error occurred while trying to get the holidays');
      }
    } catch (error) {
      this.__global.showToast('Error : ' + error);
    }
  }

}

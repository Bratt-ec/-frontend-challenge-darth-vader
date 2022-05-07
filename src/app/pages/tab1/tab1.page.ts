import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
import { CountriesService } from 'src/app/services/countries.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild('infiniteCountries') infiniteCountries: IonInfiniteScroll;
  countries:Array<any> = [];
  allCountries:Array<any> = [];
  current:number = 0;
  nextElements:number = 20;
  constructor(
    private navCtrl: NavController,
    private __global: GlobalService,
    private __countries: CountriesService,
  ) {}

  ngOnInit() {
    this.getCountries();
  }


  async getCountries(){
    try {
      const response:any = await this.__countries.getCountries();
      if(response.status == 200){
        this.allCountries = response.countries;
        this.countries = this.allCountries.slice(this.current,this.nextElements);
      }
    } catch (error) {
      this.__global.showToast('Error : ' + error);
    }
  }

  getFlag(countryCode:string){
    return `${this.__countries.apiFlags}/${countryCode.toLowerCase()}.png`;
  }

  loadData(event:any){
    this.current += 20;
    this.nextElements += 20;
    const newCountries = this.allCountries.slice(this.current,this.nextElements);
    this.countries = this.countries.concat(newCountries);
    event.target.complete();
  }

  openDetailCountry(country:any){
    this.__countries.setCountrySelected = country;
    this.navCtrl.navigateForward(`home/app/countries/country/${country.code}`);
  }

  saveCountry(country:any){
    country.saved = (country.saved) ? false : true;
    this.__countries.eventSaveCountry.next(country);
  }
}

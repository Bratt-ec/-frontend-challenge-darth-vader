import { Component } from '@angular/core';
import { CountriesService } from 'src/app/services/countries.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  countrySaved:Array<any> = [];
  eventSavedCountry:any;
  constructor(
    private __global: GlobalService,
    private __countries: CountriesService,
  ) {}

  ngOnInit(){
    this.eventSavedCountry = this.__countries.eventSaveCountry.subscribe(country =>{
      console.log(country);
      if(country.saved){
        this.countrySaved.push(country);
      } else {
        this.countrySaved = this.countrySaved.filter(c => c.code != country.code);
      }
    });
  }

  getFlag(countryCode:string){
    return `${this.__countries.apiFlags}/${countryCode.toLowerCase()}.png`;
  }
}

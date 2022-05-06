import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CountriesService {

  apiFlags:string = 'https://flagcdn.com/w320';
  countrySelected:any = null;

  constructor(
    private http: HttpClient
  ) { }

  async getCountries() {
    const response:any = await this.http.get(`${environment.base_url}/v1/countries?pretty&key=${environment.api_key}`).toPromise();
    return response;
  }

  async getHolidays(countryCode:string) {
    const response:any = await this.http.get(`${environment.base_url}/v1/holidays?pretty&country=${countryCode}&year=2021&key=${environment.api_key}`).toPromise();
    return response;
  }

  async getDetailCountry(countryCode:string) {
    const response:any = await this.http.get(`${environment.base_url}/v1/countries?pretty&country=${countryCode}&key=${environment.api_key}`).toPromise();
    return response;
  }

  public get getCountrySelected() : any {
    return this.countrySelected;
  }

  public set setCountrySelected(value : any) {
    this.countrySelected = value;
  }
}

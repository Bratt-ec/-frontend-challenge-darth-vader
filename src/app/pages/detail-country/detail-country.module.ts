import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailCountryPageRoutingModule } from './detail-country-routing.module';

import { DetailCountryPage } from './detail-country.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailCountryPageRoutingModule
  ],
  declarations: [DetailCountryPage]
})
export class DetailCountryPageModule {}

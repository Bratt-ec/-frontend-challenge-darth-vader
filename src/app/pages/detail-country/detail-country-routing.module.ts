import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailCountryPage } from './detail-country.page';

const routes: Routes = [
  {
    path: '',
    component: DetailCountryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailCountryPageRoutingModule {}

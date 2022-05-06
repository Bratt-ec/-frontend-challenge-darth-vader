import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailCountryPage } from '../detail-country/detail-country.page';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  {
    path: 'country/:countryCode',
    loadChildren: () => import('../detail-country/detail-country.module').then( m => m.DetailCountryPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageTitle } from '../../shared/constants/page-title.constant';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      pageTitle: `${PageTitle.home} | Manage accounts`
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}

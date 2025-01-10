import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccidentsComponent } from './accidents.component';
import { SharedModule } from '../../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: AccidentsComponent
  }
]

@NgModule({
  declarations: [
    AccidentsComponent
  ],
  imports: [
    SharedModule, RouterModule.forChild(routes)
  ]
})
export class AccidentsModule { }

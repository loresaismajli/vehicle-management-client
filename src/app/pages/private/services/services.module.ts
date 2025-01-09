import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ServicesComponent } from './services.component';
import { SharedModule } from '../../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ServicesComponent
  }
]

@NgModule({
  declarations: [
    ServicesComponent
  ],
  imports: [
    SharedModule, RouterModule.forChild(routes)
  ]
})
export class ServicesModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VehiclesComponent } from './vehicles.component';
import { SharedModule } from '../../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: VehiclesComponent
  }
]

@NgModule({
  declarations: [
    VehiclesComponent
  ],
  imports: [
    SharedModule, RouterModule.forChild(routes)
  ]
})
export class VehiclesModule { }

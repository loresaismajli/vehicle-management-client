import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './users.component';
import { SharedModule } from '../../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  }
]

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    SharedModule, RouterModule.forChild(routes)
  ]
})
export class UsersModule { }

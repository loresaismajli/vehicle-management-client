import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { PublicRoutingModule } from './public-routing.module';



@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    SharedModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }

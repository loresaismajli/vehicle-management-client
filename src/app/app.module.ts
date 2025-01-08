import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { interceptors } from './shared/configurations/interceptors-config';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [provideHttpClient(withInterceptorsFromDi()), interceptors],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LandingPage} from "./pages/landing/landing.page";
import {SatspassApiService} from "../service/SatspassApiService";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {HttpAuthInterceptorService} from "../interceptors/http.auth.interceptor";
import {AuthModule} from "./pages/auth/auth.module";
import {ModalService} from "../service/ModalService";

@NgModule({
  declarations: [AppComponent, LandingPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, FormsModule, ReactiveFormsModule, AuthModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SatspassApiService,
    ModalService,
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpAuthInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

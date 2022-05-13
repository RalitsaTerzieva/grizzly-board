import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { AboutPageComponent } from './components/about-page/about-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { AlertComponent } from './components/alert/alert.component';
import { BoardPageComponent } from './components/board-page/board-page.component';
import { BoardComponent } from './components/board/board.component';
import { AddStoryModalComponent } from './components/add-story-modal/add-story-modal.component';
import {MaterialConfirmModule, MaterialConfirmConfig} from '@kovalenko/material-confirm';
import { ProfileComponent } from './components/profile/profile.component';

const materialConfirmConfig: MaterialConfirmConfig = {
  ok: 'Ok',
  cancel: 'Cancel',
  position: {
    top: '10px'
  },
  width: '400px'
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LandingPageComponent,
    AboutPageComponent,
    RegisterPageComponent,
    LoginPageComponent,
    AlertComponent,
    BoardPageComponent,
    BoardComponent,
    AddStoryModalComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DragDropModule,
    MaterialConfirmModule.config(materialConfirmConfig),
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }

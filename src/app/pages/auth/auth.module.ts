import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VerifyEmailPage} from "./verify-email/verify-email.page";
import {SignUpPage} from "./sign-up/sign-up.page";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {SignInPage} from "./sign-in/sign-in.page";
import {ResetPasswordPage} from "./reset-password/reset-password.page";

const routes: Routes = [
  {
    path: 'sign-up',
    component: SignUpPage
  },
  {
    path: 'verify-email',
    component: VerifyEmailPage
  },
  {
    path: 'sign-in',
    component: SignInPage
  },
  {
    path: 'reset-password',
    component: ResetPasswordPage
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule, ReactiveFormsModule
  ],
  exports: [RouterModule],
  declarations: [SignUpPage, VerifyEmailPage, SignInPage, ResetPasswordPage]
})
export class AuthModule {}

import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage {

  constructor(private router: Router) { }

  navigateToSignUp() {
    this.router.navigate(['/auth/sign-up']);
  }

  navigateToSignIn() {
    this.router.navigate(['/auth/sign-in']);
  }

}

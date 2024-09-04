import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router";
import {SatspassApiService} from "../../../../service/SatspassApiService";
import {SignUpRequest} from "../../../../model/SignUpRequest";
import {ModalService} from "../../../../service/ModalService";

@Component({
  selector: 'app-signup',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss']
})
export class SignUpPage {

  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private satspassApiService: SatspassApiService,
    private modalService: ModalService
  ) {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: [''],  // Optional field
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSignup() {
    const loading = await this.modalService.loading()
    const {email, username, password} = this.signupForm.value;
    this.satspassApiService.signUp(new SignUpRequest(
      email, username, password
    )).then(r => {
      this.signupForm.reset();
      this.router.navigate(['/verify-email'], {queryParams: {email}});
      this.modalService.toast( 'Bem vindo, um email com o código confirmação foi enviado')
    })
      .catch(err => console.log(err))
      .finally(() => loading.dismiss());

  }

  navigateToLanding() {
    this.router.navigate(['/']);
  }
}

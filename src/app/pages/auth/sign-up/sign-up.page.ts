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
    await this.modalService.wrapInLoading(() => {
        return this.callSignUp();
      },
      'Bem vindo, um email com o código confirmação foi enviado',
      false,
      'Falha ao cadastrar, tente novamente!')
  }

  private async callSignUp() {
    const {email, username, password} = this.signupForm.value;
    await this.satspassApiService.signUp(new SignUpRequest(
      email, username, password
    ))
    this.signupForm.reset();
    await this.router.navigate(['/auth/verify-email'], {queryParams: {email}});
  }
}

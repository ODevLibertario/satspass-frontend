import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SatspassApiService} from "../../../../service/SatspassApiService";
import {Router} from "@angular/router";
import {ModalService} from "../../../../service/ModalService";
import {wrapInPromise} from "../../../../util/promiseUtil";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {

  resetPasswordForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private satspassApiService: SatspassApiService,
    private router: Router,
    private modalService: ModalService
  ) {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }


  async onSend() {
    await this.modalService.wrapInLoading(() => {
      return Promise.all([
        this.satspassApiService.resetPassword(this.resetPasswordForm.value.email),
        this.router.navigate(['/auth/sign-in'])
        ]
      )
    },
      'Sua nova senha foi enviada para o e-mail cadastrado!',
      false,
      'Falha ao resetar senha, confira o email cadastrado',
      wrapInPromise( () => this.resetPasswordForm.reset())
    )
  }
}

import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {SatspassApiService} from "../../../../service/SatspassApiService";
import {ModalService} from "../../../../service/ModalService";

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage {

  verifyEmailForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private satspassApiService: SatspassApiService,
              private route: ActivatedRoute,
              private modalService: ModalService) {
    this.verifyEmailForm = this.formBuilder.group({
      code: ['', [Validators.required]]
    });
  }

  async onSend() {
    const loading = await this.modalService.loading()
    this.satspassApiService.verifyEmail(
      this.route.snapshot.queryParamMap.get('email')!,
      this.verifyEmailForm.value.code
    ).then(r => {
      this.modalService.toast('Email confirmado, realize o login.')
      this.router.navigate(['/auth/sign-in']);
      }
    ).catch(err => {
      //TODO Adicionar botão para reenviar o código
      this.modalService.toast( 'Falha ao confirmar email, verifique o código.', 'danger')
      console.log(err)
    }).finally(() => loading.dismiss());
  }
}

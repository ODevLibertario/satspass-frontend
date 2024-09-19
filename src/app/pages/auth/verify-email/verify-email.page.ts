import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {SatspassApiService} from "../../../../service/SatspassApiService";
import {ModalService} from "../../../../service/ModalService";

//TODO Adicionar botão para reenviar o código
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
    await this.modalService.wrapInLoading(() => {
        return Promise.all([
          this.satspassApiService.verifyEmail(
            this.route.snapshot.queryParamMap.get('email')!,
            this.verifyEmailForm.value.code
          ),
          this.router.navigate(['/auth/sign-in'])
        ])

      }, 'Email confirmado, realize o login.',
      false,
      'Falha ao confirmar email, verifique o código.')
  }
}

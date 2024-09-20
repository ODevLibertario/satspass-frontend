import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SatspassApiService} from "../../../service/SatspassApiService";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {confirmPasswordValidator} from "../../validators/ConfirmPasswordValidator";
import {ModalService} from "../../../service/ModalService";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage {

  email: string;
  changePasswordForm: FormGroup;

  constructor(formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private satspassApiService: SatspassApiService,
              private modalService: ModalService) {
    this.email = this.route.snapshot.queryParamMap.get('email')!
    this.changePasswordForm = formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', [Validators.required]],
    }, {
      validators: confirmPasswordValidator('newPassword', 'confirmNewPassword')
    })
  }

  onSend() {
    this.modalService.wrapInLoading(() => {
      return this.runUpdatePassword()
    }, 'Senha alterada com sucesso!', true)
  }

  async runUpdatePassword() {
    await this.satspassApiService.updatePassword({email: this.email, oldPassword: this.changePasswordForm.value.oldPassword, newPassword: this.changePasswordForm.value.newPassword})
    await this.router.navigate(['/'])
  }
}

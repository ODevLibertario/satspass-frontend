import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ModalService} from "../../../../service/ModalService";
import {SatspassApiService} from "../../../../service/SatspassApiService";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage {

  signInForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: ModalService,
    private satspassApiService: SatspassApiService,
    private storage: Storage
  ) {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSignIn() {
    const loading = await this.modalService.loading()
    const {email, password} = this.signInForm.value;
    try {
      const {token, role} = await this.satspassApiService.signIn(email, password)
      await this.storage.set('token', token)
      await this.storage.set('role', role)
      this.signInForm.reset()
      await this.router.navigate(['/' + this.toPrettyRole(role) + '/home']);
    }catch (err) {
      console.log(err)
      await this.modalService.toast('Falha ao realizar login, verifique seu email e senha', 'danger')
    } finally {
      await loading.dismiss()
    }
  }

  private toPrettyRole(role: string) {
    switch (role) {
      case 'ADMIN':
        return 'admin'
      case 'EVENT_MANAGER':
        return 'manager'
      case 'EVENT_CUSTOMER':
        return 'customer'
    }
    return undefined
  }

  resetPassword() {
    this.router.navigate(['/auth/reset-password']);
  }
}

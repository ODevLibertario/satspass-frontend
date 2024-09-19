import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SatspassApiService} from "../../../../service/SatspassApiService";
import {User} from "../../../../model/User";
import {ModalService} from "../../../../service/ModalService";
import {Router} from "@angular/router";
import {managerTabs} from "../home/home.page";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  profileForm: FormGroup;
  user: User | undefined = undefined;

  constructor(private router: Router, private formBuilder: FormBuilder, private satspassApiService: SatspassApiService, private modalService: ModalService) {
    this.profileForm = this.formBuilder.group({
      lightningAddress: ['', [Validators.email]],
    });

  }

  ngOnInit() {
    this.satspassApiService.getUser().then(user => {
      this.user = user;
      this.profileForm.setValue({
        lightningAddress: this.user.lightningAddress
      })
    })

  }

  updatePassword() {

  }

  async saveProfile() {
    await this.modalService.wrapInLoading(() => {
      return Promise.all([
        this.satspassApiService.updateLightningAddress(this.profileForm.value.lightningAddress),
        this.router.navigate(["/manager/home"])
      ])
    }, 'Perfil atualizado!', true)
  }

  protected readonly managerTabs = managerTabs;
}

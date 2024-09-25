import { Component, OnInit } from '@angular/core';
import {SatspassApiService} from "../../../../service/SatspassApiService";
import {User} from "../../../../model/User";
import {ModalService} from "../../../../service/ModalService";
import {Router} from "@angular/router";
import {customerTabs} from "../home/home.page";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user: User | undefined = undefined;

  constructor(
    private router: Router,
    private satspassApiService: SatspassApiService,
    private modalService: ModalService
  ) {

  }

  ngOnInit() {
    this.satspassApiService.getUser().then(user => {
      this.user = user;
    })
  }

  updatePassword() {
    this.router.navigate(["/user/change-password"], {queryParams: {email: this.user!.email}})
  }

  protected readonly customerTabs = customerTabs;
}

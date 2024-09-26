import { Component, OnInit } from '@angular/core';
import {SatspassApiService} from "../../../../service/SatspassApiService";
import {User} from "../../../../model/User";
import {Router} from "@angular/router";
import {customerTabs} from "../home/home.page";
import {Storage} from "@ionic/storage";

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
    private storage: Storage
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

  logOut() {
    this.storage.set('token', undefined)
    this.storage.set('role', undefined)
    this.router.navigate(["/"])
  }
}

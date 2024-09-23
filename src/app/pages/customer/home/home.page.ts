import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {SatspassApiService} from "../../../../service/SatspassApiService";
import {Event} from "../../../../model/Event";
import {clamp} from "../../../../util/mathUtils";
import {Platform} from "@ionic/angular";
import {Tab} from "../../../../model/Tab";

export const customerTabs = [
  new Tab('Início', 'home', '/customer/home'),
  new Tab('Ingressos', 'pricetag', '/customer/tickets'),
  new Tab('Perfil', 'person', '/customer/profile')
]

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  events: Event[] = []
  constructor(private router: Router, private satspassApiService: SatspassApiService, protected platform: Platform) { }

  navigateToEvent(event: Event) {
    this.router.navigate(['/customer/event'], {
      state: event
    });
  }

  ngOnInit() {
    this.satspassApiService.getCustomerEvents().then(r => {
      this.events = r
    })
  }

  protected readonly clamp = clamp;
  protected readonly customerTabs = customerTabs;
}

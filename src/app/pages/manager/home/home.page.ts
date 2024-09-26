import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {clamp} from "../../../../util/mathUtils";
import {Event} from "../../../../model/Event";
import {SatspassApiService} from "../../../../service/SatspassApiService";
import {Platform} from "@ionic/angular";
import {Tab} from "../../../../model/Tab";

export const managerTabs = [
  new Tab('Início', 'home', '/manager/home'),
  new Tab('Validar', 'barcode', '/manager/validate-ticket'),
  new Tab('Perfil', 'person', '/manager/profile')
]

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  events: Event[] | undefined;

  constructor(private router: Router, private satspassApiService: SatspassApiService, protected platform: Platform) { }


  navigateToEvent(event: Event | undefined = undefined) {
    if (event != undefined) {
      this.router.navigate(['/manager/event'], {
        state: event
      });
    } else {
      this.router.navigate(['/manager/event']);
    }
  }

  protected readonly clamp = clamp;

  ngOnInit(): void {
    this.satspassApiService.getManagerEvents().then(events => {
      console.log(events);
      this.events = events;
    })
  }

  protected readonly Platform = Platform;
  protected readonly managerTabs = managerTabs;
}

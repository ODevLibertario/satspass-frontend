import { Component } from '@angular/core';
import {Location} from "@angular/common";

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage {

  constructor(private location: Location) { }

  back() {
    this.location.back()
  }
}

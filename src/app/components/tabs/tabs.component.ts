import {Component, Input} from '@angular/core';
import {Tab} from "../../../model/Tab";

@Component({
  selector: 'tabs',
  templateUrl: 'tabs.component.html',
  styleUrls: ['tabs.component.scss']
})
export class TabsComponent {

  @Input()
  config: Tab[] = []

  constructor() {}

}

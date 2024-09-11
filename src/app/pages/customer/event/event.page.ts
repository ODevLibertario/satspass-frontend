import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  event = {
    "publicityImageUrl":'',
    "name": "Evento teste", 
    "location": "Local: mané garrincha",
    "startDate": 'Dia: 01/01/2024 - 02/01/2024',
    "startTimeAndEndTime": 'Horas: 18:00 - 00:01',
    "description": 'Zhcsgdcsdg sdgshgdcs sgdvbsdfgsdf sgfgdsgf s gsdggd fsgd fgslgjdfvsbd fgsd'
  }

  constructor() { }

  ngOnInit() {
  }

}

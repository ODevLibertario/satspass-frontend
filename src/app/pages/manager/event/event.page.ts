import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {SatspassApiService} from "../../../../service/SatspassApiService";
import {ModalService} from "../../../../service/ModalService";
import {DateTimePickerOuput} from "../../../components/date-time-picker/date-time-picker.component";
import {UpsertEventRequest} from "../../../../model/UpsertEventRequest";
import * as moment from "moment";
import {Event, EventStatus} from "../../../../model/Event";
import {AlertController} from "@ionic/angular";
import {TicketCategoryPage} from "../ticket-category/ticket-category.page";
import {TicketCategory} from "../../../../model/TicketCategory";

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {

  eventId: string | undefined;
  event: Event | undefined;
  eventForm: FormGroup;
  startDate: DateTimePickerOuput | undefined;
  startDateInitialValue: Date | undefined;
  endDate: DateTimePickerOuput | undefined;
  endDateInitialValue: Date | undefined;
  startTime: DateTimePickerOuput | undefined;
  startTimeInitialValue: Date | undefined;
  endTime: DateTimePickerOuput | undefined;
  endTimeInitialValue: Date | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private satspassApiService: SatspassApiService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private alertController: AlertController,
  ) {
    this.eventForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      location: [''],
      publicityImageUrl: ['']
    });
  }

  async ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      const id = params.get('eventId');
      if (id != null) {
        await this.refreshEvent(id);
      } else {
        this.eventId = undefined;
      }
    })
  }

  private async refreshEvent(eventId: string) {
    this.eventId = eventId;
    this.event = await this.satspassApiService.getEvent(this.eventId)
    if (this.event) {
      this.eventForm.setValue({
        name: this.event.name,
        description: this.event.description,
        location: this.event.location,
        publicityImageUrl: this.event.publicityImageUrl,
      })
      this.startDateInitialValue = this.event.startDate
      this.endDateInitialValue = this.event.endDate
      this.startTimeInitialValue = this.event.startTime
      this.endTimeInitialValue = this.event.endTime
    }
  }

  async onSubmit() {
    if(this.eventForm.valid && this.startDate?.valid && this.endDate?.valid && this.startTime?.valid && this.endTime?.valid) {
      return await this.modalService.wrapInLoading(() => {
        return this.callAddEvent()
      }, 'Evento adicionado com sucesso!', 'Falha ao adicionar evento')
    }
  }

  async callAddEvent() {
    this.eventId = (await this.satspassApiService.addEvent(new UpsertEventRequest(
      this.eventForm.value.name,
      moment(this.startDate!.value, 'DD/MM/YYYY').toDate(),
      moment(this.endDate!.value, 'DD/MM/YYYY').toDate(),
      moment(this.startTime!.value, 'HH:mm').toDate(),
      moment(this.endTime!.value, 'HH:mm').toDate(),
      this.eventForm.value.description,
      this.eventForm.value.location,
      this.eventForm.value.publicityImageUrl
    ))).eventId
  }

  navigateToHome() {
    this.router.navigate(['/manager/home']);
  }

  navigateToTicketCategory(ticketCategory: TicketCategory | undefined = undefined) {
    if (ticketCategory != undefined) {
      this.router.navigate(['/manager/ticket-category', this.eventId, ticketCategory.id], {
        state: ticketCategory
      });
    } else {
      this.router.navigate(['/manager/ticket-category', this.eventId]);
    }
  }

  onStartDateChange(event: DateTimePickerOuput) {
    this.startDate = event;
  }

  onEndDateChange(event: DateTimePickerOuput) {
    this.endDate = event;
  }

  onStartTimeChange(event: DateTimePickerOuput) {
    this.startTime = event;
  }

  onEndTimeChange(event: DateTimePickerOuput) {
    this.endTime = event;
  }

  async publishEvent() {
    const alert = await this.alertController.create(
      {
        header: 'Publicar evento',
        message: 'Tem certeza? O evento não poderá ser editado ou excluído após a publicação.',
        buttons: [{
          text: 'Sim',
          handler: () => {
            this.modalService.wrapInLoading(() => {
              return this.satspassApiService.publishEvent(this.eventId!)
            }).then(r => this.refreshEvent(this.eventId!))
          },
        }, 'Não'],

      }
    )

    await alert.present()
  }

  async deleteEvent() {
    const alert = await this.alertController.create(
      {
        header: 'Remover evento',
        message: 'Tem certeza? O evento não poderá ser recuperado.',
        buttons: [{
          text: 'Sim',
          handler: () => {
            this.modalService.wrapInLoading(() => {
              return this.satspassApiService.deleteEvent(this.eventId!)
            }, 'Evento removido com sucesso', 'Falha ao remover evento')
              .then(r => this.navigateToHome())
          },
        }, 'Não'],

      }
    )

    await alert.present()
  }

  async deleteTicketCategory(ticketCategoryId: string) {
    const alert = await this.alertController.create(
      {
        header: 'Remover categoria',
        message: 'Tem certeza? A categoria não poderá ser recuperada.',
        buttons: [{
          text: 'Sim',
          handler: () => {
            this.modalService.wrapInLoading(() => {
              return this.satspassApiService.deleteTicketCategory(this.eventId!, ticketCategoryId)
            }, 'Categoria removida com sucesso', 'Falha ao remover categoria')
              .then(r => this.refreshEvent(this.eventId!))
          },
        }, 'Não'],

      }
    )

    await alert.present()
  }
}

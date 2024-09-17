import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DateTimePickerOuput} from "../../../components/date-time-picker/date-time-picker.component";
import {ActivatedRoute, Router} from "@angular/router";
import {SatspassApiService} from "../../../../service/SatspassApiService";
import {ModalService} from "../../../../service/ModalService";
import {UpsertTicketCategoryRequest} from "../../../../model/UpsertTicketCategoryRequest";
import * as moment from "moment/moment";

@Component({
  selector: 'app-ticket-category',
  templateUrl: './ticket-category.page.html',
  styleUrls: ['./ticket-category.page.scss'],
})
export class TicketCategoryPage {

  eventId: string;
  ticketCategoryForm: FormGroup;
  startDate: DateTimePickerOuput | undefined;
  endDate: DateTimePickerOuput | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private satspassApiService: SatspassApiService,
    private modalService: ModalService,
    private route: ActivatedRoute,
  ) {
    this.eventId = this.route.snapshot.paramMap.get('eventId')!

    this.ticketCategoryForm = this.formBuilder.group({
      categoryName: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],  // Optional field
      quantity: ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
  }

  onStartDateChange(event: DateTimePickerOuput) {
    this.startDate = event
  }

  onEndDateChange(event: DateTimePickerOuput) {
    this.endDate = event
  }


  async onSubmit() {
    await this.modalService.wrapInLoading(() => {
      return this.doSubmit()
    }, 'Categoria adicionada com sucesso!', 'Falha ao adicionar categoria, tente novamente')

  }

  async doSubmit(){
    await this.satspassApiService.addTicketCategory(this.eventId, new UpsertTicketCategoryRequest(
      this.ticketCategoryForm.value.categoryName,
      this.ticketCategoryForm.value.price,
      'BRL',
      this.ticketCategoryForm.value.quantity,
      new Date(),
      moment('31/12/2100', 'DD/MM/YYYY').toDate(),
    ))
    this.navigateToEvent()

  }

  navigateToEvent() {
    this.router.navigate(['/manager/event', this.eventId]);
  }
}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {SatspassApiService} from "../../../../service/SatspassApiService";
import {ModalService} from "../../../../service/ModalService";
import {UpsertTicketCategoryRequest} from "../../../../model/UpsertTicketCategoryRequest";
import * as moment from "moment/moment";
import {TicketCategory} from "../../../../model/TicketCategory";
import {managerTabs} from "../home/home.page";

@Component({
  selector: 'app-ticket-category',
  templateUrl: './ticket-category.page.html',
  styleUrls: ['./ticket-category.page.scss'],
})
export class TicketCategoryPage implements OnInit {

  eventId: string;
  ticketCategory: TicketCategory | undefined;
  ticketCategoryForm: FormGroup;

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

  async onSubmit() {
    await this.modalService.wrapInLoading(() => {
      return this.doSubmit()
    }, 'Categoria adicionada com sucesso!', false, 'Falha ao adicionar categoria, tente novamente')
  }

  async doSubmit(){
    if(this.ticketCategory) {
      await this.satspassApiService.updateTicketCategory(this.eventId, this.ticketCategory.id, new UpsertTicketCategoryRequest(
        this.ticketCategoryForm.value.categoryName,
        this.ticketCategoryForm.value.price,
        'BRL',
        this.ticketCategoryForm.value.quantity,
        new Date(),
        moment('31/12/2100', 'DD/MM/YYYY').toDate(),
      ))
    } else {
      await this.satspassApiService.addTicketCategory(this.eventId, new UpsertTicketCategoryRequest(
        this.ticketCategoryForm.value.categoryName,
        this.ticketCategoryForm.value.price,
        'BRL',
        this.ticketCategoryForm.value.quantity,
        new Date(),
        moment('31/12/2100', 'DD/MM/YYYY').toDate(),
      ))
    }

    this.navigateToEvent()
  }

  navigateToEvent() {
    this.router.navigate(['/manager/event', this.eventId]);
  }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    this.ticketCategory = navigation?.extras.state as TicketCategory;
    if (this.ticketCategory != null) {
      this.ticketCategoryForm.setValue({
        categoryName: this.ticketCategory.categoryName,
        price: this.ticketCategory.price,
        quantity: this.ticketCategory.quantity
      });
    }
  }

  protected readonly managerTabs = managerTabs;
}

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidateTicketPage } from './validate-ticket.page';

describe('ValidateTicketPage', () => {
  let component: ValidateTicketPage;
  let fixture: ComponentFixture<ValidateTicketPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateTicketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

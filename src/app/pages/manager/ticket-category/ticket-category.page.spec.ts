import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicketCategoryPage } from './ticket-category.page';

describe('TicketCategoryPage', () => {
  let component: TicketCategoryPage;
  let fixture: ComponentFixture<TicketCategoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

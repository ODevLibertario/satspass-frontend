import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as moment from 'moment';

export class DateTimePickerOuput {
  value: string | undefined;
  valid: boolean = false;

  constructor(
    value: string | undefined,
    valid: boolean = false
  ) {
    this.value = value;
    this.valid = valid;
  }
}

@Component({
  selector: 'date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss'],
})
export class DateTimePickerComponent implements OnInit {
  @Input() label!: string;
  @Input() type!: string;

  value: any = {
    'day': '01',
    'month': '01',
    'year': '2024',
    'hour': '00',
    'minute': '00'
  }

  @Output() valueChange: EventEmitter<DateTimePickerOuput> = new EventEmitter<DateTimePickerOuput>();

  constructor() {
  }

  ngOnInit(): void {
    this.emitValue()
  }

  onChange(type: string, newValue: any) {
    this.value[type] = newValue.detail.value
    this.emitValue();
  }

  private emitValue() {
    if (this.type == 'date') {
      const output = `${this.value.day}/${this.value.month}/${this.value.year}`
      const valid = moment(output, 'DD/MM/YYYY', true).isValid()
      this.valueChange.emit(new DateTimePickerOuput(valid ? output : undefined, valid))
    }

    if (this.type == 'time') {
      const output = `${this.value.hour}:${this.value.minute}`
      const valid = moment(output, 'HH:mm', true).isValid()
      this.valueChange.emit(new DateTimePickerOuput(valid ? output : undefined, valid))
    }
  }

  getDays(): string[] {
    return this.getNumbers(31);
  }

  getMonths(): string[] {
    return this.getNumbers(12);
  }

  getYears(): string[] {
    return this.getNumbers(2027, 2024);
  }

  getHours(): string[] {
    return this.getNumbers(23, 0);
  }

  getMinutes(): string[] {
    return this.getNumbers(59, 0);
  }

  getNumbers(stop: number, start: number = 1, step: number = 1) {
    return Array.from(
      { length: (stop - start) / step + 1 },
      (value, index) => start + index * step
    ).map(num => num < 10 ? "0" + num.toString() : num.toString());
  }

}

import { CommonModule } from '@angular/common';
import { Component, ViewChild, ViewEncapsulation} from '@angular/core';
import { MatCalendarCellClassFunction, MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, CommonModule, MatButtonModule],
  providers: [provideNativeDateAdapter(),
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'},
  ],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  selected: Date = new Date();
  @ViewChild('picker') picker!: MatDatepicker<Date>;
  selectedDay: string = '';

  
  ngOnInit() {
    this.getDate({ value: this.selected }); 
  }

  getDate(event: any) {
    this.selected = event.value;
    
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (this.selected.toDateString() === today.toDateString()) {
      this.selectedDay = 'Hoy';
    } else if (this.selected.toDateString() === yesterday.toDateString()) {
      this.selectedDay = 'Ayer';
    } else {
      this.selectedDay = this.selected.toLocaleDateString('es-ES');
    }
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      const date = cellDate.getDate();
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }
    return '';
  };


  openPicker() {
    this.picker.open();
  }
}

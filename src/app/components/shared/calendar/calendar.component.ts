import { CommonModule } from '@angular/common';
import { Component, ViewChild, ViewEncapsulation} from '@angular/core';
import { MatCalendarCellClassFunction, MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { DateSelectionService } from '../../../services/calendar.service';
import { MonthData } from '../../../model/monthdata.model';

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

  private hasExecutedForCurrentMonth: boolean = false;
  private currentMonth: number = -1;
  currentDaysToCheck?: MonthData;

  monthData: MonthData[] = [];

  constructor(private dateSelectionService: DateSelectionService) {}

    
  ngOnInit() {
    this.getDate({ value: this.selected }); 
    this.fetchDateData(1);
  }

  getDate(event: any) {
    this.selected = event.value;
    this.dateSelectionService.setSelectedDate(this.selected);

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

  fetchDateData(userId: number) {
    this.dateSelectionService.fetchDateData(userId).subscribe({
      next: (monthDataResponse) => {
        this.monthData = monthDataResponse;
      },
      error: () => { console.log("Error en getEntry") }
    });
  }

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      const activeMonth = cellDate.getMonth();
      const activeYear = cellDate.getFullYear();

      const formattedMonth = (activeMonth + 1) < 10 ? `0${activeMonth + 1}` : `${activeMonth + 1}`;
      const formattedYear = `${activeYear}`;

      const key = `${formattedMonth}${formattedYear}`;

      if (activeMonth !== this.currentMonth) {
        this.currentMonth = activeMonth;
        if (!this.hasExecutedForCurrentMonth) {
          
          this.currentDaysToCheck = this.monthData.find(item => item.dateKey === key);
          console.log(this.currentDaysToCheck);

          this.hasExecutedForCurrentMonth = true;
        }
      } else {
        this.hasExecutedForCurrentMonth = false;
      }
    
      if (this.currentDaysToCheck) {
        const date = cellDate.getDate();
        let classNames = '';
        
        if (this.currentDaysToCheck.gold && this.currentDaysToCheck.silver) {
          if (this.currentDaysToCheck.gold.includes(date)) {
            classNames += 'gold-class ';
          }
          if (this.currentDaysToCheck.silver.includes(date)) {
            classNames += 'silver-class ';
          }
        }
        return classNames;
      }

    }
    return '';
  };

  openPicker() {
    this.picker.open();
  }
}

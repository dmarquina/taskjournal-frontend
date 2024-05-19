import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MonthData } from '../model/monthdata.model';

@Injectable({
  providedIn: 'root'
})
export class DateSelectionService {

  private http = inject(HttpClient);
  private selectedDateSource = new BehaviorSubject<Date>(new Date());
  selectedDate$ = this.selectedDateSource.asObservable();

  setSelectedDate(date: Date) {
    this.selectedDateSource.next(date);
  }

  fetchDateData(userId: number){
    return this.http.get<MonthData[]>(`http://localhost:8080/dates/`+ userId);
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MonthData } from '../model/monthdata.model';
import { environment } from '../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class DateSelectionService {

  private http = inject(HttpClient);
  private selectedDateSource = new BehaviorSubject<Date>(new Date());
  selectedDate$ = this.selectedDateSource.asObservable();
  private apiUrl = environment.apiUrl;
  private datesEndpoint = `${this.apiUrl}/dates/`;

  setSelectedDate(date: Date) {
    this.selectedDateSource.next(date);
  }

  fetchDateData(userId: number){
    return this.http.get<MonthData[]>(this.datesEndpoint + userId);
  }
}
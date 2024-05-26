import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Entry } from '../model/entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private http = inject(HttpClient);

  constructor() {

  }
  
  getEntry(userId: number, createdAt: string) {
    let params = new HttpParams()
      .set('userId', userId.toString())
      .set('createdAt', createdAt);
      return this.http.get<Entry>('http://localhost:8080/entries/', { params });
  }
  
  createEntry(createEntryRequest: Object) {
    return this.http.post<Entry>('http://localhost:8080/entries/', createEntryRequest);
  }
  
  updateEntry(updateEntryRequest: Object) {
    return this.http.put<Entry>('http://localhost:8080/entries/', updateEntryRequest);
  }

}

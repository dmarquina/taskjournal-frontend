import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Entry } from '../model/entry.model';
import { environment } from '../../environments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private entriesEndpoint = `${this.apiUrl}/entries/`;

  constructor() {

  }
  
  getEntry(userId: number, createdAt: string) {
    let params = new HttpParams()
      .set('userId', userId.toString())
      .set('createdAt', createdAt);
      return this.http.get<Entry>(this.entriesEndpoint, { params });
  }
  
  createEntry(createEntryRequest: Object) {
    return this.http.post<Entry>(this.entriesEndpoint, createEntryRequest);
  }
  
  updateEntry(updateEntryRequest: Object) {
    return this.http.put<Entry>(this.entriesEndpoint, updateEntryRequest);
  }

}

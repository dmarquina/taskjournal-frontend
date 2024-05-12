import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Entry } from '../model/entry.model';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private http = inject(HttpClient);

  constructor() {

  }
  
  createEntry(createEntryRequest: Object) {
    return this.http.post<Entry>('http://localhost:8080/entries/', createEntryRequest);
  }
}

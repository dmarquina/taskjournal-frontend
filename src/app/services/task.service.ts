import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Task } from '../model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private http = inject(HttpClient);

  constructor() {

  }

  getTasks() {
    return this.http.get<Task[]>('http://localhost:8080/users/1/tasks');
  }
}

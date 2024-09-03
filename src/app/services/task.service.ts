import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Task } from '../model/task.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private tasksEndpoint = `${this.apiUrl}/tasks/`;

  constructor() {}

  getTasks(userId: number, createdAt: string) {
    let params = new HttpParams()
      .set('userId', userId.toString())
      .set('createdAt', createdAt);
      return this.http.get<Task[]>(this.tasksEndpoint, { params });
  }

  createTask(createTaskRequest: Object) {
    return this.http.post<Task>(this.tasksEndpoint, createTaskRequest);
  }

  deleteTask(taskId: number) {
    return this.http.delete(this.tasksEndpoint + taskId,{});
  }
}

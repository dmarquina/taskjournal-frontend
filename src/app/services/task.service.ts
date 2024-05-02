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

  createTask(createTaskRequest: Object) {
    return this.http.post<Task[]>('http://localhost:8080/tasks/', createTaskRequest);
  }

  updateTaskStatus(taskId: number) {
    return this.http.patch<Task>('http://localhost:8080/tasks/' + taskId,{});
  }

  deleteTask(taskId: number) {
    return this.http.delete('http://localhost:8080/tasks/' + taskId,{});
  }
}

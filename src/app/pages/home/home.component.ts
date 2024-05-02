import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from './../../model/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  private taskService = inject(TaskService);

  tasks = signal<Task[]>([]);

  ngOnInit() {
    this.getTasks();
  }


  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern('^\\S.*$'),
      Validators.minLength(3),
    ]
  })


  changeHandler() {
    if (this.newTaskCtrl.valid) {
      this.addTask(this.newTaskCtrl.value);
      this.newTaskCtrl.setValue('');
    } else {
      console.log("no es valido")
    }

  }

  addTask(name: string) {
    const createTaskRequest = {
      userId: 1,
      name: name,
    }
    this.taskService.createTask(createTaskRequest).subscribe({
      next: (tasks) => {
        this.tasks.set(tasks)
      },
      error: () => { console.log("Error en updateTask") }
    });
  }

  updateTask(taskId: number, currentPos: number) {
    this.taskService.updateTaskStatus(taskId).subscribe({
      next: () => {
        this.tasks.update(prevState => {
          return prevState.map((task, position) => {
            if (position === currentPos) {
              return {
                ...task,
                completed: !task.completed
              }
            }
            return task;
          })
        });
      },
      error: () => { console.log("Error en updateTask") }
    })

  }

  deleteTask(taskId: number, index: number): void {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => this.tasks.update((tasks) => {
        tasks.splice(index, 1);
        return tasks;
      }),
      error: () => { console.log("Error en deleteTask()")}
    })
  }

  private getTasks() {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks.set(tasks)
      },
      error: () => { console.log("Error en updateTask") }
    })
  }
}

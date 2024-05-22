import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../model/task.model';
import { TaskService } from '../../services/task.service';
import { DateSelectionService } from '../../services/calendar.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-task',
    standalone: true,
    styleUrl: './task.component.css',
    templateUrl: './task.component.html',
    providers: [DatePipe],
    imports: [ReactiveFormsModule, MatIconModule, CommonModule]
})

export class TaskComponent {

  @Input({required: true}) tasks = signal<Task[]>([]);
  
  private taskService = inject(TaskService);
  currentDate: Date = new Date();

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern('^\\S.*$'),
      Validators.minLength(3),
    ]
  })


  constructor(private dateSelectionService: DateSelectionService, private datePipe: DatePipe) { }
  
  ngOnInit() {
    this.dateSelectionService.selectedDate$.subscribe(date => {
      this.currentDate = date;
    });
  }

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
      createdAt: this.datePipe.transform(this.currentDate, 'yyyy-MM-dd')
    }
    this.taskService.createTask(createTaskRequest).subscribe({
      next: (task: Task) => {
        this.tasks.update(prevTasks => [...prevTasks, task]);
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

  
}

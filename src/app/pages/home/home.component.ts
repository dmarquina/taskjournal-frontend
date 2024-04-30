import { Component, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {Task} from './../../model/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: 'Crear proyecto',
      isCompleted: false
    },
    
    {
      id: Date.now(),
      title: 'Crear componente',
      isCompleted: true
    },
    
    {
      id: Date.now(),
      title: 'Escribir cualquier cosa',
      isCompleted: false
    }
  ])

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern('^\\S.*$'),
      Validators.minLength(3),
    ]
  })


  changeHandler() {
    if(this.newTaskCtrl.valid) {
      this.addTask(this.newTaskCtrl.value);
      this.newTaskCtrl.setValue('');
    } else {
      console.log("no es valido")
    }
    
  }

  addTask(title: string) {
    const newTask = {
      id: Date.now(),
      title: title,
      isCompleted: false
    }
    this.tasks.update((tasks) => [...tasks, newTask]);
  }
  
  updateTask(index: number) {
    console.log(index);
    this.tasks.update(prevState  => {
      return prevState.map((task, position) => {
        if (position === index) {
          console.log(task);
          return {
            ...task,
            isCompleted: !task.isCompleted
          }
        }
        return task;
      })
    });
  }

  deleteTask(index: number): void {
    this.tasks.update((tasks) => {
      tasks.splice(index, 1);
      return tasks;
    });
  }
}

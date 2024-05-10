import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../model/task.model';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { CalendarComponent } from '../calendar/calendar.component';


@Component({
  selector: 'app-today',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CalendarComponent],
  templateUrl: './today.component.html',
  styleUrl: './today.component.css'
})

export class TodayComponent {

  private taskService = inject(TaskService);

  tasks = signal<Task[]>([]);

  constructor(private router: Router) { }

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

  
  prepararNavegacion() {
    //TODO: Llamar a generador de entrada
    const datos = { entryId: 1, content: "23 de agosto de 2021\n\nHoy ha sido un día bastante movido, pero también productivo. Empecé la mañana yendo al entrenamiento, seguido de un delicioso desayuno de pan con jamonada y queso acompañado de un vaso de milo. Después de tanto ejercicio, decidí tomar una siesta para recuperar un poco de sueño.\n\nLuego me puse a estudiar para la entrevista con Encora, la cual tuve más tarde. La entrevista fue bastante bien y después de almorzar, me relajé viendo 2 capítulos de 2 Broke Girls. \n\nDespués de un pequeño descanso, decidí jugar un par de partidas de Dota para despejar la mente. Posteriormente, avancé un poco en mi TaskJournal para mantenerme organizado.\n\nAunque no logré completar la tarea de leer 5 páginas de Xueños, siento que el día fue bastante productivo y estoy contento con todo lo que logré. ¡Mañana será otro día para intentarlo de nuevo!" };
    this.router.navigate(['/create-entry'], {state: datos});
  }
}

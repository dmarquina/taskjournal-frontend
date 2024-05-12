import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { CalendarComponent } from "../../components/shared/calendar/calendar.component";
import { TaskComponent } from "../../components/task/task.component";
import { ActionButtonComponent } from "../../components/shared/actionbutton/actionbutton.component";
import { Task } from '../../model/task.model';
import { TaskService } from '../../services/task.service';
import { EntryService } from '../../services/entry.service';
import { Entry } from '../../model/entry.model';

@Component({
    selector: 'app-tasklist',
    standalone: true,
    templateUrl: './tasklist.component.html',
    styleUrl: './tasklist.component.css',
    imports: [CalendarComponent, TaskComponent, ActionButtonComponent]
})

export class TaskListComponent {
    @Output() entryCreated = new EventEmitter<Entry>();
    
    private taskService = inject(TaskService);
    private entryService = inject(EntryService);
    entry = signal<Entry | null>(null);

    buttonText = "CERRAR DIA";
    tasks = signal<Task[]>([]);

    ngOnInit() {
        this.getTasks();
    }

      
    private getTasks() {
        this.taskService.getTasks().subscribe({
          next: (tasks) => {
            this.tasks.set(tasks)
          },
          error: () => { console.log("Error en updateTask") }
        })
    }
      
    createEntry() {
        const createEntryRequest = {
            userId: 1,
            taskIds: this.obtenerTaskIds(),
        }

        this.entryService.createEntry(createEntryRequest).subscribe({
          next: (entry) => {
            this.entry.set(entry);
            this.entryCreated.emit(entry);
          },
          error: () => { console.log("Error en createEntry") }
        })
    }

    private obtenerTaskIds() : number[]{
        let ids:number[] = []
        this.tasks.update((tasks) => {
            ids = tasks.map(task => task.taskId);
            return tasks;
          });
        return ids;
    }



}

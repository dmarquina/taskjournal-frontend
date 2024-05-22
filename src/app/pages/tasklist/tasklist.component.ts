import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { CalendarComponent } from "../../components/shared/calendar/calendar.component";
import { TaskComponent } from "../../components/task/task.component";
import { ActionButtonComponent } from "../../components/shared/actionbutton/actionbutton.component";
import { Task } from '../../model/task.model';
import { TaskService } from '../../services/task.service';
import { EntryService } from '../../services/entry.service';
import { Entry } from '../../model/entry.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { DateSelectionService } from '../../services/calendar.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tasklist',
  standalone: true,
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.css',
  providers: [DatePipe],
  imports: [CalendarComponent, TaskComponent, ActionButtonComponent, MatProgressSpinnerModule, CommonModule]
})

export class TaskListComponent {
  @Output() entryCreated = new EventEmitter<Entry>();

  private taskService = inject(TaskService);
  private entryService = inject(EntryService);

  currentDate: Date = new Date();
  entry = signal<Entry | null>(null);
  tasks = signal<Task[]>([]);

  buttonText = "CERRAR DIA";
  isLoading = false;

  constructor(private dateSelectionService: DateSelectionService, private datePipe: DatePipe) { }


  ngOnInit() {
    this.getTasks();
    this.dateSelectionService.selectedDate$.subscribe(date => {
      this.currentDate = date;
      this.getTasks();
    });
  }

  private getTasks() {
    let createdAt =  this.datePipe.transform(this.currentDate, 'yyyy-MM-dd') ?? '';

    this.taskService.getTasks(1, createdAt).subscribe({
      next: (tasks) => {
        this.tasks.set(tasks)
      },
      error: () => { console.log("Error en getTask") }
    })
  }

  createEntry() {
    this.isLoading = true;
    const createEntryRequest = {
      userId: 1,
      taskIds: this.obtenerTaskIds(),
      createdAt: this.datePipe.transform(this.currentDate, 'yyyy-MM-dd')
    }

    this.entryService.createEntry(createEntryRequest).subscribe({
      next: (entry) => {
        this.entry.set(entry);
        this.entryCreated.emit(entry);
        setTimeout(() => {
          this.isLoading = false;
        }, 400);

      },
      error: () => { console.log("Error en createEntry") }
    })
  }

  private obtenerTaskIds(): number[] {
    let ids: number[] = []
    this.tasks.update((tasks) => {
      ids = tasks.map(task => task.taskId);
      return tasks;
    });
    return ids;
  }

}

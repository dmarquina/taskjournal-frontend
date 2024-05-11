import { Component } from '@angular/core';
import { CalendarComponent } from "../../components/shared/calendar/calendar.component";
import { TaskComponent } from "../../components/task/task.component";
import { CloseDayButtonComponent } from "../../components/shared/closedaybutton/closedaybutton.component";

@Component({
    selector: 'app-tasklist',
    standalone: true,
    templateUrl: './tasklist.component.html',
    styleUrl: './tasklist.component.css',
    imports: [CalendarComponent, TaskComponent, CloseDayButtonComponent]
})

export class TaskListComponent {


}

import { Component } from '@angular/core';
import { CalendarComponent } from "../../components/shared/calendar/calendar.component";
import { TaskComponent } from "../../components/task/task.component";
import { ActionButtonComponent } from "../../components/shared/actionbutton/actionbutton.component";

@Component({
    selector: 'app-tasklist',
    standalone: true,
    templateUrl: './tasklist.component.html',
    styleUrl: './tasklist.component.css',
    imports: [CalendarComponent, TaskComponent, ActionButtonComponent]
})

export class TaskListComponent {

    buttonText = "CERRAR DIA";

}

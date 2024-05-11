import { Component } from '@angular/core';
import { TaskListComponent } from "../tasklist/tasklist.component";
import { JournalComponent } from "../journal/journal.component";
import { CalendarComponent } from "../../components/shared/calendar/calendar.component";
import {MatTabsModule} from '@angular/material/tabs';

@Component({
    selector: 'app-taskjournal',
    standalone: true,
    templateUrl: './taskjournal.component.html',
    styleUrl: './taskjournal.component.css',
    imports: [TaskListComponent, JournalComponent, CalendarComponent,MatTabsModule]
})
export class TaskJournalComponent {

}

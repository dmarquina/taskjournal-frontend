import { Component } from '@angular/core';
import { TaskListComponent } from "../tasklist/tasklist.component";
import { JournalComponent } from "../journal/journal.component";
import { CalendarComponent } from "../../components/shared/calendar/calendar.component";
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { Entry } from '../../model/entry.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-taskjournal',
    standalone: true,
    templateUrl: './taskjournal.component.html',
    styleUrl: './taskjournal.component.css',
    imports: [TaskListComponent, JournalComponent, CalendarComponent,MatTabsModule,MatIconModule]
})
export class TaskJournalComponent {
    
    entryForJournal?: Entry;
    selectedTab=0;

    constructor (private router: Router) {}

    createEntryProcess(entry: Entry) {
        this.selectedTab=1;
        this.entryForJournal = entry;
    }

    logout(){
        localStorage.removeItem('user');
        this.router.navigate(['']);
    }
}

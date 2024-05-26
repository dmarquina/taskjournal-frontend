import { Component, inject } from '@angular/core';
import { TaskListComponent } from "../tasklist/tasklist.component";
import { JournalComponent } from "../journal/journal.component";
import { CalendarComponent } from "../../components/shared/calendar/calendar.component";
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { Entry } from '../../model/entry.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TokenModalComponent } from '../../components/token-modal/token-modal.component';
import { User } from '../../model/user.model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    selector: 'app-taskjournal',
    standalone: true,
    templateUrl: './taskjournal.component.html',
    styleUrl: './taskjournal.component.css',
    imports: [TaskListComponent, JournalComponent, CalendarComponent,MatTabsModule,MatIconModule]
})
export class TaskJournalComponent {

    private authService = inject(AuthenticationService);
    
    entryForJournal?: Entry;
    selectedTab=0;
    user?: User;
    tokens?: number;
    title? : string;
    
    constructor (private router: Router, public dialog: MatDialog) {}

    ngOnInit() {
        this.setTitle();
    }

    createEntryProcess(entry: Entry) {
        this.selectedTab=1;
        this.entryForJournal = entry;
        this.setTitle();
    }

    logout(){
        localStorage.removeItem('user');
        this.router.navigate(['']);
    }

    setTitle() {
        this.user = this.authService.getUser();
        this.tokens = this.user?.tokens;
        if (this && this.tokens !== undefined) {
            this.title = "Tienes " + this.tokens;
    
            this.title += (this.tokens > 1 || this.tokens == 0 ) ? " Tokens" : " Token";
        } else {
            this.title = "Tienes 0 Tokens";
        }
    }

    openDialog(): void {
      const dialogRef = this.dialog.open(TokenModalComponent, {
        data: {tokens: this.tokens}
      });
    }
}

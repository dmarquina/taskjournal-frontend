import { Component } from '@angular/core';
import { EntryComponent } from "../../components/entry/entry.component";

@Component({
    selector: 'app-journal',
    standalone: true,
    templateUrl: './journal.component.html',
    styleUrl: './journal.component.css',
    imports: [EntryComponent]
})
export class JournalComponent {

}

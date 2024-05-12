import { Component, Input } from '@angular/core';
import { EntryComponent } from "../../components/entry/entry.component";
import { Entry } from '../../model/entry.model';

@Component({
    selector: 'app-journal',
    standalone: true,
    templateUrl: './journal.component.html',
    styleUrl: './journal.component.css',
    imports: [EntryComponent]
})
export class JournalComponent {
    @Input() entry?: Entry;

}

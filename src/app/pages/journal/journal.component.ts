import { Component, Input, inject } from '@angular/core';
import { EntryComponent } from "../../components/entry/entry.component";
import { Entry } from '../../model/entry.model';
import { DatePipe } from '@angular/common';
import { DateSelectionService } from '../../services/calendar.service';
import { EntryService } from '../../services/entry.service';

@Component({
    selector: 'app-journal',
    standalone: true,
    templateUrl: './journal.component.html',
    styleUrl: './journal.component.css',
    providers: [DatePipe],
    imports: [EntryComponent]
})
export class JournalComponent {
    @Input() entry?: Entry;
    currentDate: Date = new Date();

    private entryService = inject(EntryService);
    
    constructor(private dateSelectionService: DateSelectionService, private datePipe: DatePipe) { }

    ngOnInit() {
        this.getEntry();
        this.dateSelectionService.selectedDate$.subscribe(date => {
            this.currentDate = date;
            this.getEntry();
        });
    }

    private getEntry() {
        let createdAt =  this.datePipe.transform(this.currentDate, 'yyyy-MM-dd') ?? '';
    
        this.entryService.getEntry(1, createdAt).subscribe({
          next: (entry) => {
            this.entry = entry;
          },
          error: () => { console.log("Error en getEntry") }
        })
      }
}

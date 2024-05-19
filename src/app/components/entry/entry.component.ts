import { Component, EventEmitter, Input, LOCALE_ID , Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActionButtonComponent } from "../shared/actionbutton/actionbutton.component";
import { CommonModule } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { DatePipe, registerLocaleData } from '@angular/common';
import { Entry } from '../../model/entry.model';
registerLocaleData(localeEs, 'es');

@Component({
    selector: 'app-entry',
    standalone: true,
    templateUrl: './entry.component.html',
    styleUrl: './entry.component.css',
    providers: [{provide: LOCALE_ID, useValue: 'es'}, DatePipe],
    imports: [MatButtonModule, MatIconModule, ActionButtonComponent, CommonModule]
})
export class EntryComponent {
  
  @Output() executedMethod = new EventEmitter<void>();
  @Input() entry?: Entry;
  
  disabledEntry = true;
  buttonText = "EDITAR";
  hasEntry= false;

  constructor(private datePipe: DatePipe) { }
  
  enableEditOrSaveEntry() {
    if(this.disabledEntry){
      this.disabledEntry = false;
      this.buttonText = "GUARDAR";
    } else {
      this.disabledEntry = true;
      this.buttonText = "EDITAR";
    }
    this.executedMethod.emit();
  }

  obtenerFechaFormateada() {
    if (!this.entry || !this.entry.createdAt) {
      return '';
    }
    const formattedDate = this.datePipe.transform(this.entry.createdAt, 'EEEE, d \'de\' MMMM \'de\' y', 'es-ES');

    if (formattedDate) {
      let finalDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
      return finalDate;
    }
    
    return '';
  }

}


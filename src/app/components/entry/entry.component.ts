import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { ActionButtonComponent } from "../shared/actionbutton/actionbutton.component";

@Component({
    selector: 'app-entry',
    standalone: true,
    templateUrl: './entry.component.html',
    styleUrl: './entry.component.css',
    imports: [MatButtonModule, MatIconModule, ActionButtonComponent]
})
export class EntryComponent {
  
  @Output() executedMethod = new EventEmitter<void>();
  
  constructor(private route: ActivatedRoute) { }

  title = "Miércoles, 12 de mayo de 2021"
  content = "Hoy fue un día bastante movido, pero productivo. Empecé la mañana yendo al entrenamiento, como de costumbre, seguido de un desayuno sano para recargar energías. Luego tuve una reunión con Michael para discutir algunos detalles del proyecto en el que estamos trabajando.\n\nDespués de la reunión, nos reunimos todo el equipo para hacer la retrospectiva del sprint 5. Fue genial poder analizar lo que hicimos bien y en qué podemos mejorar para el próximo sprint. Luego me dediqué a depurar el código de la feature 5.2, un trabajo tedioso pero necesario.\n\nPor último, saqué a los perros a pasear y disfruté de un rato al aire libre. Aunque no pude almorzar con mis primos ni cenar quesadillas como había planeado, al menos pude cumplir con las tareas más importantes del día.\n\nMañana será otro día lleno de actividades, pero por ahora, me siento satisfecho con lo que logré hoy. ¡Hasta mañana!";
  disabledEntry = true;
  buttonText = "EDITAR";

  ngOnInit() {
  }

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

}


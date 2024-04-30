import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  tasks = [
    'Crear proyecto',
    'Crear componente',
    'Escribir cualquier cosa'
  ]
  person = {
    name : "Diego",
    age : 31

  }

  clickHandler() {
    alert('Holi');
  }

  dblClickHandler() {
    alert('Holi2');
  }

  changeHandler(event: Event) {
    console.log(event);
  }

  keydownHandler(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }
}

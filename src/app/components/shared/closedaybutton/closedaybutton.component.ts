import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-closedaybutton',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './closedaybutton.component.html',
  styleUrl: './closedaybutton.component.css'
})
export class CloseDayButtonComponent {

  prepararNavegacion() {
    console.log("");
  }
}

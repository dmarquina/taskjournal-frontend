import { Component, Input  } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-actionbutton',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './actionbutton.component.html',
  styleUrl: './actionbutton.component.css'
})
export class ActionButtonComponent {

  @Input() buttonText: string = '';
  @Input() methodToExecute: () => void = () => {}; 

  onClick() {
    this.methodToExecute();
  }
}

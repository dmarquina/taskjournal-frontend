import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-entry',
  standalone: true,
  imports: [],
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.css'
})
export class EntryComponent {
  
  constructor(private route: ActivatedRoute) { }

  content = "";

  ngOnInit() {
    const datos = history.state;
    this.content = datos.content || "";
  }

  saveEntry() {
    console.log("guardado");
    console.log(this.content);
  }
}

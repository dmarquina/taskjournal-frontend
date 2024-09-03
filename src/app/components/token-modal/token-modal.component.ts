import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-token-modal',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose],
  templateUrl: './token-modal.component.html',
  styleUrl: './token-modal.component.css'
})
export class TokenModalComponent {
  
  message?: string;

  constructor(
    public dialogRef: MatDialogRef<TokenModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  
  ngOnInit() {
    this.setContentMessage();
  }

  setContentMessage() {
    this.message = this.data.tokens> 0 ? `Aún tienes ${this.data.tokens} créditos` : 'Ya no tienes créditos';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  askForMoreTokens(): void {
    window.location.href = 'https://api.whatsapp.com/send?phone=51993390236&text=Hola,%20deseo%20más%20tokens%20para%20TaskJournal';
  }
 
  
}

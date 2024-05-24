import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../model/user.model';
import { Router } from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, CommonModule,FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {
  
  private authService = inject(AuthenticationService);

  loginForm: FormGroup;
  registerForm: FormGroup;
  isLoginFormVisible: boolean = true;
  matcher = new MyErrorStateMatcher();

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void { 
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/taskjournal']);
    }
  }

  switchToLogin() {
    this.isLoginFormVisible = true;
  }

  switchToRegister() {
    this.isLoginFormVisible = false;
  }

  onLogin() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.authService.login(loginData).subscribe({
        next: (user: User) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/taskjournal']);
        },
        error: () => { 
          alert("Correo o contraseña incorrecto");
        }
      });
      
    }
  }

  onRegister() {
    if (this.registerForm.valid) {

      const registerForm = this.registerForm.value;
      this.authService.createUser(registerForm).subscribe({
        next: (user: User) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/taskjournal']);
        },
        error: () => {
          alert("Este correo ya existe");
        }
      });
      
    }
  }
}
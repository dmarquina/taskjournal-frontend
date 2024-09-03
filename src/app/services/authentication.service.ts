import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from '../model/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  private userEndpoint = `${this.apiUrl}/users/`;

  constructor() { }

  login(loginRequest: Object) {
    return this.http.post<User>(this.userEndpoint + 'auth', loginRequest);
  }

  createUser(createUserRequest: Object) {
    return this.http.post<User>(this.userEndpoint, createUserRequest);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  getUser(): any {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  useOneToken() {
    let user = this.getUser();
    user.tokens = user.tokens - 1;
    localStorage.setItem('user' , JSON.stringify(user));
  }
}

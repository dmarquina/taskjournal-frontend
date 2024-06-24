import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Entry } from '../model/entry.model';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private http = inject(HttpClient);
  
  constructor() { }

  login(loginRequest: Object) {
    return this.http.post<User>('http://18.220.170.17:8080/users/auth', loginRequest);
  }

  createUser(createUserRequest: Object) {
    return this.http.post<User>('http://18.220.170.17:8080/users/', createUserRequest);
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

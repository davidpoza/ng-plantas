import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean;

  constructor() {
    this.isLoggedIn = false;
  }

  userIsLoggedIn() : boolean {
    return this.isLoggedIn;
  }
}

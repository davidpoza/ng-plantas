import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'src/config';
import { IUser } from '../models/IUser';
import { writeCookie, readCookie } from '../utils/helpers';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean;
  private user!: IUser;
  private token: string;

  constructor(private http: HttpClient, private router: Router) {
    this.token = readCookie('token');
    this.isLoggedIn = !!this.token || false;
  }

  userIsLoggedIn() : boolean {
    return this.isLoggedIn;
  }

  getToken() {
    return this.token;
  }

  login(email: string, password: string) {
    this.http.post(`${config.baseUrl}/login`, { email, password })
      .subscribe((result : any) => {
        this.user = {
          id: result.id,
          name: result.user.name,
          email: result.user.email,
        };
        writeCookie('token', result.accessToken);
        this.isLoggedIn = true;
        this.router.navigate(['/']);
      });

  }
}

import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Injectable, } from '@angular/core';
import { config } from 'src/config';
import { IUser } from '../models/IUser';
import { writeCookie, readCookie } from '../utils/helpers';
import { Router } from '@angular/router';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean;
  private user!: IUser;
  private token: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private loaderService: LoaderService
  ) {
    this.token = readCookie('token');
    this.isLoggedIn = !!this.token || false;
    this.user = JSON.parse(localStorage.getItem('user') || "{}");
  }

  userIsLoggedIn() : boolean {
    return this.isLoggedIn;
  }

  getToken() : string {
    return this.token;
  }

  getUserId() : number {
    return this.user.id;
  }

  getUser() : IUser {
    return this.user;
  }

  login(email: string, password: string) {
    this.loaderService.setVisibility(true);
    return this.http.post(`${config.baseUrl}/login`, { email, password })
      .pipe(
        catchError((e: any) => {
          this.loaderService.setVisibility(false);
          if ([400, 401].includes(e.status)) return throwError(() => 'Credenciales incorrectas');
          return throwError(() => e.message);
        }),
        tap((result : any) => {
          this.loaderService.setVisibility(false);
          this.user = {
            id: result.user.id,
            name: result.user.name,
            email: result.user.email,
          };
          this.token = result.accessToken;
          writeCookie('token', result.accessToken);
          localStorage.setItem('user', JSON.stringify(this.user));
          this.isLoggedIn = true;
          this.router.navigate(['/']);
        })
      )
  }

  logout() {
    this.token = '';
    writeCookie('token', '');
    localStorage.setItem('user', '');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);

  }
}

import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Injectable, } from '@angular/core';

import { IUser } from '../models/IUser';
import { writeCookie, readCookie } from '../utils/helpers';
import { Router } from '@angular/router';
import { LoaderService } from './loader.service';
import { config } from '../../config';

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
    return this.http.post(`${config.baseApiUrl}/auth/login`, { email, password })
      .pipe(
        catchError((e: any) => {
          this.loaderService.setVisibility(false);
          if ([400, 401].includes(e.status)) return throwError(() => 'Credenciales incorrectas');
          return throwError(() => e.message);
        }),
        tap((result : any) => {

          this.token = result.data.access_token;
          writeCookie('token', result.data.access_token);
          this.isLoggedIn = true;

          this.http.get(`${config.baseApiUrl}/users/me`)
            .subscribe((userInfo : any) => {
              this.loaderService.setVisibility(false);
              this.user = {
                id: userInfo.data.id,
                name: userInfo.data.name,
                email: userInfo.data.email,
              };
              localStorage.setItem('user', JSON.stringify(this.user));
            });

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

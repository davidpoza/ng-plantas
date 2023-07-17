import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.auth.getToken();
    if (request.url.includes('auth/refresh')) { // we don't want to include the authorization header en refresh
      return next.handle(request);
    }
    const authReq = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${authToken}`)
    });
    // return next.handle(authReq);
    return next.handle(authReq).pipe(
      tap({
        error: (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status !== 401) {
              return next.handle(request);
            }
            if (this.auth.getRefreshToken()) {
              return this.auth.renewToken()
                .subscribe({
                  next: () => {
                    return next.handle(authReq);
                  },
                  error: (e) => {
                    this.auth.logout();
                    return throwError(() => e);
                  }
                });
            } else {
              this.auth.logout();
              return throwError(() => err);
            }
          }
          return next.handle(request);
        }
      })
    );
  }
}

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  isRefreshingToken: boolean;
  tokenSubject: BehaviorSubject<string|null>;

  constructor(
    private auth: AuthService,
  ) {
    this.isRefreshingToken = false;
    this.tokenSubject = auth.getToken();
  }


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('auth/refresh')) { // we don't want to include the authorization header en refresh
      return next.handle(request);
    }

    const authReq = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${this.tokenSubject.value}`)
    });
    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status !== 401) return next.handle(authReq);

        // is unauthorized
        if (!this.isRefreshingToken) {
          this.isRefreshingToken = true;
          this.tokenSubject.next(null); // Reset here so that the following requests wait until the token comes back from the refreshToken call.
          return this.auth.renewToken()
            .pipe(
              tap(() => {
                this.isRefreshingToken = false;
                return next.handle(request.clone({
                  headers: request.headers.set('Authorization', `Bearer ${this.tokenSubject.value}`)
                }));
              }),
              catchError((e) => {
                this.isRefreshingToken = false;
                this.auth.logout();
                return throwError(() => e);
              })
            );
        } else { // rest of 401 requests come here when token is being refreshed
          return this.tokenSubject
            .pipe(
              filter(token => token != null),
              take(1),
              switchMap(token => {
                  const reqWithNewToken = request.clone({
                    headers: request.headers.set('Authorization', `Bearer ${token}`)
                  });
                  return next.handle(reqWithNewToken);
              })
            );
        }
      })
    );
  }
}

import {
  HttpErrorResponse,
  HttpHandler, HttpHeaderResponse,
  HttpInterceptor, HttpProgressEvent,
  HttpRequest, HttpResponse, HttpSentEvent, HttpUserEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {throwError, BehaviorSubject, Observable} from 'rxjs';
import {catchError, filter, map, switchMap, take} from 'rxjs/operators';

import {environment} from '../../environments/environment';
import {NewAuthService} from '../core/stores/auth/services/new-auth.service';
import {
  constructHeaders,
} from '../core/stores/auth/util/util';
import {RouterActions} from '../core/stores/router';
import {Routes} from '../core/stores/router/enum/routes.enum';

const authPaths = ['/auth/refresh/', '/auth/signin/'];

type AnyHttpEvent = (
  HttpSentEvent |
  HttpHeaderResponse |
  HttpProgressEvent |
  HttpResponse<any> |
  HttpUserEvent<any> |
  any);

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  refreshActionCode = 401;

  private refreshTokenInProgress = false;
  private refreshTokenSubject = new BehaviorSubject<boolean>(false);

  constructor(private store$: Store<any>, private auth: NewAuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<AnyHttpEvent> {
    console.log('intercept');

    return next.handle(this.addTokenRequest(request))
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === this.refreshActionCode) {
            if (this.refreshTokenInProgress) {
              return this.refreshTokenSubject.pipe(
                filter(inProgress => !inProgress),
                take(1),
                switchMap(() =>
                  next.handle(
                    this.addTokenRequest(request),
                  )),
              );
            }

            return this.refreshAndRetry(request, next);
          }

          return throwError(err);
        }),
      );
  }

  private isHeaderRequired(request: HttpRequest<any>) {
    return request.url.includes(environment.apiUrl) && authPaths.every(path => !request.url.includes(path));
  }

  private refreshTokenExpired() {
    console.log('refreshTokenExpired');
    this.auth.logout().subscribe(() => this.store$.dispatch(new RouterActions.Go({path: [Routes.AuthRoute]})));
  }

  private addTokenRequest(request: HttpRequest<any>) {
    return this.isHeaderRequired(request) && this.auth.accessToken ? request.clone({ setHeaders: <AuthHeaders>constructHeaders({
        accessToken: this.auth.accessToken,
      }) }) : request;
  }

  private refreshAndRetry(request: HttpRequest<any>, next: HttpHandler) {
    console.log('refreshAndRetry');
    this.refreshTokenInProgress = true;
    this.refreshTokenSubject.next(true);
    return this.auth.tokenRefresh()
      .pipe(
        catchError(response => {
          this.refreshTokenInProgress = false;
          this.refreshTokenExpired();

          return throwError(response.error.error);
        }),
        switchMap(() => {
          this.refreshTokenInProgress = false;
          this.refreshTokenSubject.next(false);
          return next.handle(this.addTokenRequest(request));
        }),
      );
  }
}

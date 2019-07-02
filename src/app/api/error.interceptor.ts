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

import {AuthService} from '../core/stores/auth/services/auth.service';
import {
  constructHeaders,
  cookieNames,
  formatData,
  getCookie,
  setTokenResponseToCookies
} from '../core/stores/auth/util/util';
import {RouterActions} from '../core/stores/router';
import {Routes} from '../core/stores/router/enum/routes.enum';
import {FormattedApiResponse} from '../core/stores/auth/models/formattedApiResponse.model';
import * as AuthActions from '../core/stores/auth/auth.actions';

type AnyHttpEvent = (
  HttpSentEvent |
  HttpHeaderResponse |
  HttpProgressEvent |
  HttpResponse<any> |
  HttpUserEvent<any> |
  any);

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  // constructor(private store$: Store<any>) {}

  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   return next.handle(request).pipe(
  //     catchError((response: any) => {
  //       if (response instanceof HttpErrorResponse && response.status === 401) {
  //         console.log(response);
  //         if (!getCookie(cookieNames.refreshToken)) {
  //           this.store$.dispatch(new RouterActions.Go({path: [Routes.AuthRoute]}));
  //         }
  //       }
  //       // TODO: разобраться - переводить на форму авторизации или слать повторный запрос на обновление refresh-токена
  //       return throwError(response);
  //     }),
  //   );
  // }

  refreshActionCode = 401;

  private refreshTokenInProgress = false;
  private refreshTokenSubject = new BehaviorSubject<boolean>(false);

  constructor(private authService: AuthService, private store$: Store<any>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<AnyHttpEvent> {
    console.log('intercept');

    request = request.clone({ setHeaders: <AuthHeaders>constructHeaders({
        accessToken: getCookie(cookieNames.accessToken),
      }) });

    return next.handle(request)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === this.refreshActionCode) {
            if (this.refreshTokenInProgress) {
              return this.refreshTokenSubject.pipe(
                filter(inProgress => !inProgress),
                take(1),
                switchMap(() => {
                  request = request.clone({ setHeaders: <AuthHeaders>constructHeaders({
                      accessToken: getCookie(cookieNames.accessToken),
                    }),
                  });

                  return next.handle(request);
                }),
              );
            }

            return this.refreshAndRetry(request, next);
          }

          return throwError(err);
        }),
      );
  }

  private refreshTokenExpired() {
    console.log('refreshTokenExpired');

    this.store$.dispatch(new RouterActions.Go({path: [Routes.DefaultRoute]}));
  }

  private refreshAndRetry(request: HttpRequest<any>, next: HttpHandler) {
    console.log('refreshAndRetry');
    this.refreshTokenInProgress = true;
    this.refreshTokenSubject.next(true);
    return this.authService.refreshToken()
      .pipe(
        map(formatData),
        catchError(response => {
          this.refreshTokenInProgress = false;
          this.refreshTokenExpired();

          return throwError(response.error.error);
        }),
        switchMap((formattedData: FormattedApiResponse) => {
          setTokenResponseToCookies({ ...formattedData.state,
            refreshToken: getCookie(cookieNames.refreshToken),
          }, true);

          this.refreshTokenInProgress = false;
          this.refreshTokenSubject.next(false);
          request = request.clone({ setHeaders: <AuthHeaders>constructHeaders({
              accessToken: getCookie(cookieNames.accessToken),
            }) });

          return next.handle(request);
        }),
      );
  }
}

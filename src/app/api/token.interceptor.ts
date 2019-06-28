import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import { Observable } from 'rxjs';
import {flatMap, map, switchMap} from 'rxjs/operators';

import { environment } from '../../environments/environment';
import {AuthActions} from '../core/stores/auth';
import {ProvideHeadersActions} from '../core/stores/auth/enum/provideHeadersActions.enum';
import {notAuthenticatedCookies} from '../core/stores/auth/models/cookies.model';
import {AuthService} from '../core/stores/auth/services/auth.service';
import {constructHeaders, cookieNames, getCookie} from '../core/stores/auth/util/util';

const authPaths = ['/auth/refresh/', '/auth/signin/'];

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService, private store$: Store<any>) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return [environment.apiUrl].some(domain => request.url.includes(domain) && authPaths.every(path => !request.url.includes(path)))
      ? this.authService.provideHeaders()
        .pipe(switchMap(headers => {
          // if (headers.action === ProvideHeadersActions.TokenRefresh) {
          //   this.store$.dispatch(new AuthActions.RefreshToken());
          // } else if (headers.action === ProvideHeadersActions.EmptyHeaders) {
          //   this.store$.dispatch(new AuthActions.EraseLoginState(notAuthenticatedCookies));
          // }

          request = request.clone({ setHeaders: <AuthHeaders>constructHeaders({
              accessToken: getCookie(cookieNames.accessToken),
            }) });
          return next.handle(request);
        }))
      : next.handle(request);
  }
}

import {Injectable} from '@angular/core';
import {ofType, Actions, Effect} from '@ngrx/effects';
import {of, EMPTY} from 'rxjs';
import {catchError, flatMap, map, switchMap, tap} from 'rxjs/operators';

import {getCookie} from '../../../utils/cookies';
import {RouterActions} from '../router';
import {Routes} from '../router/enum/routes.enum';

import * as AuthActions from './auth.actions';
import {ProvideHeadersActions} from './enum/provideHeadersActions.enum';
import {notAuthenticatedCookies} from './models/cookies.model';
import {FormattedApiResponse} from './models/formattedApiResponse.model';
import {AuthService} from './services/auth.service';
import {cookieNames, formatData, getDateNowInSeconds, setCookies, setTokenResponseToCookies} from './util/util';

@Injectable()
export class AuthEffects {
  @Effect()
  login$ = this.actions$.pipe(
    ofType(AuthActions.Types.Login),
    flatMap((action: AuthActions.Login) => [
      new AuthActions.SetFetching(true),
      new AuthActions.QueryLogin(action.payload),
    ]),
  );

  @Effect()
  queryLogin$ = this.actions$.pipe(
    ofType(AuthActions.Types.QueryLogin),
    switchMap((action: AuthActions.QueryLogin) =>
      this.authService.login(action.payload.authData).pipe(
        map(formatData),
        catchError(response => of(formatData(response.error))),
        flatMap((formattedData: FormattedApiResponse) => [
          new AuthActions.SetState(formattedData.state),
          new AuthActions.SetError(formattedData.error),
          new AuthActions.SetFetching(false),
          new AuthActions.SetIsLoggedIn(formattedData.statusCode === 200),
          new AuthActions.SetStatus(formattedData.status),
          new AuthActions.SetStatusCode(formattedData.statusCode),
          new AuthActions.SetTokenResponseToCookies({item: formattedData.state, rememberMe: action.payload.rememberMe}),
          new RouterActions.Go({path: [formattedData.statusCode === 200 ? Routes.DefaultRoute : Routes.AuthRoute]}),
        ]),
      ),
    ),
  );

  @Effect({dispatch: false})
  setTokenResponseToCookies$ = this.actions$.pipe(
    ofType(AuthActions.Types.SetTokenResponseToCookies),
    tap((action: AuthActions.SetTokenResponseToCookies) => setTokenResponseToCookies(action.payload.item, action.payload.rememberMe)),
  );

  @Effect({dispatch: false})
  setCookies$ = this.actions$.pipe(
    ofType(AuthActions.Types.SetCookies),
    tap((action: AuthActions.SetCookies) => setCookies(action.payload)),
  );

  @Effect()
  initialize$ = this.actions$.pipe(
    ofType(AuthActions.Types.Initialize),
    map((action: AuthActions.Types.Initialize) => {
      const dateNowInSeconds = getDateNowInSeconds();
      const accessTokenExpTime = +(getCookie(cookieNames.accessTokenExpTime) || 0);
      const rememberMe = getCookie(cookieNames.rememberMe);
      const token = getCookie(cookieNames.accessToken);

      if (rememberMe === 'true' && token) {
        if (accessTokenExpTime > dateNowInSeconds) {
          return new AuthActions.InitializeState({
            token: getCookie(cookieNames.accessToken),
            refreshToken: getCookie(cookieNames.refreshToken),
            login: getCookie(cookieNames.login),
            firstName: getCookie(cookieNames.firstName),
            lastName: getCookie(cookieNames.lastName),
            email: getCookie(cookieNames.email),
          });
        } else {
          return new AuthActions.RefreshToken();
        }
      } else {
        return new RouterActions.Go({path: [Routes.AuthRoute]});
      }
    }),
  );

  @Effect()
  initializeState$ = this.actions$.pipe(
    ofType(AuthActions.Types.InitializeState),
    flatMap((action: AuthActions.InitializeState) => [
      new AuthActions.SetState(action.payload),
      new AuthActions.SetIsLoggedIn(true),
      new RouterActions.Go({path: [Routes.DefaultRoute]}),
    ]),
  );

  @Effect()
  refreshToken$ = this.actions$.pipe(
    ofType(AuthActions.Types.RefreshToken),
    switchMap((action: AuthActions.RefreshToken) =>
      this.authService.refreshToken().pipe(
        map(formatData),
        catchError(response => of(formatData(response.error))),
        flatMap((formattedData: FormattedApiResponse) => [
          new AuthActions.SetState(formattedData.state),
          new AuthActions.SetError(formattedData.error),
          new AuthActions.SetFetching(false),
          new AuthActions.SetIsLoggedIn(formattedData.statusCode === 200),
          new AuthActions.SetStatus(formattedData.status),
          new AuthActions.SetStatusCode(formattedData.statusCode),
          new AuthActions.SetTokenResponseToCookies({item: formattedData.state}),
          new RouterActions.Go({path: [Routes.DefaultRoute]}),
        ]),
      ),
    ),
  );

  @Effect()
  eraseLoginState$ = this.actions$.pipe(
    ofType(AuthActions.Types.EraseLoginState),
    flatMap((action: AuthActions.EraseLoginState) => [
      new AuthActions.SetCookies(action.payload),
      new AuthActions.SetIsLoggedIn(false),
    ]),
  );

  @Effect()
  logout$ = this.actions$.pipe(
    ofType(AuthActions.Types.Logout),
    flatMap((action: AuthActions.Logout) => [
      new AuthActions.ProvideHeaders(),
      new AuthActions.QueryLogout(),
    ]),
  );

  @Effect()
  provideHeaders$ = this.actions$.pipe(
    ofType(AuthActions.Types.ProvideHeaders),
    switchMap((action: AuthActions.ProvideHeaders) =>
      this.authService.provideHeaders().pipe(
        map(headers => {
          if (headers.action === ProvideHeadersActions.TokenRefresh) {
            return new AuthActions.RefreshToken();
          } else if (headers.action === ProvideHeadersActions.EmptyHeaders) {
            return new AuthActions.EraseLoginState(notAuthenticatedCookies);
          } else {
            return EMPTY;
          }
        }),
      ),
    ),
  );

  @Effect()
  queryLogout$ = this.actions$.pipe(
    ofType(AuthActions.Types.QueryLogout),
    switchMap((action: AuthActions.QueryLogout) =>
      this.authService.logout().pipe(
        flatMap(() => [
          new AuthActions.SetIsLoggedIn(false),
          new AuthActions.SetCookies(notAuthenticatedCookies),
        ]),
      ),
    ),
  );

  constructor(private actions$: Actions,
              private authService: AuthService) {}
}

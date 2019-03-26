import {Injectable} from '@angular/core';
import {ofType, Actions, Effect} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, flatMap, map, switchMap, tap} from 'rxjs/operators';

import {RouterActions} from '../router';
import {Routes} from '../router/enum/routes.enum';

import * as AuthActions from './auth.actions';
import {initialState} from './auth.reducer';
import {ProvideHeadersActions} from './enum/provideHeadersActions.enum';
import {notAuthenticatedCookies} from './models/cookies.model';
import {FormattedApiResponse} from './models/formattedApiResponse.model';
import {AuthService} from './services/auth.service';
import {
  cookieNames,
  formatData,
  getCookie,
  getDateNowInSeconds,
  setCookies,
  setTokenResponseToCookies,
} from './util/util';

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

  @Effect({dispatch: false})
  NoTokenRefreshNeeded$ = this.actions$.pipe(
    ofType(AuthActions.Types.NoTokenRefreshNeeded),
    tap(() => {}),
  );

  @Effect()
  initialize$ = this.actions$.pipe(
    ofType(AuthActions.Types.Initialize),
    map(() => {
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
    switchMap(() =>
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
          // TODO: убрать условие когда появятся гарды
          new RouterActions.Go({path: [formattedData.statusCode === 200 ? Routes.DefaultRoute : Routes.AuthRoute]}),
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
    flatMap(() => [
      new AuthActions.ProvideHeaders(),
      new AuthActions.QueryLogout(),
    ]),
  );

  @Effect()
  provideHeaders$ = this.actions$.pipe(
    ofType(AuthActions.Types.ProvideHeaders),
    switchMap(() =>
      this.authService.provideHeaders().pipe(
        map(headers => {
          switch (headers.action) {
            case ProvideHeadersActions.TokenRefresh:
              return new AuthActions.RefreshToken();
            case ProvideHeadersActions.EmptyHeaders:
              return new AuthActions.EraseLoginState(notAuthenticatedCookies);
            case ProvideHeadersActions.NoTokenRefresh:
              return new AuthActions.NoTokenRefreshNeeded();
          }
        }),
      ),
    ),
  );

  @Effect()
  queryLogout$ = this.actions$.pipe(
    ofType(AuthActions.Types.QueryLogout),
    switchMap(() =>
      this.authService.logout().pipe(
        flatMap(() => [
          new AuthActions.SetWholeState(initialState),
          new AuthActions.SetCookies(notAuthenticatedCookies),
          new RouterActions.Go({ path: [Routes.AuthRoute]} ),
        ]),
      ),
    ),
  );

  @Effect()
  restorePassword$ = this.actions$.pipe(
    ofType(AuthActions.Types.RestorePassword),
    flatMap((action: AuthActions.RestorePassword) => [
      new AuthActions.SetFetching(true),
      new AuthActions.SetIsPasswordRestoreFinished(false),
      new AuthActions.QueryRestorePassword(action.payload),
    ]),
  );

  @Effect()
  queryRestorePassword$ = this.actions$.pipe(
    ofType(AuthActions.Types.QueryRestorePassword),
    switchMap((action: AuthActions.QueryRestorePassword) =>
      this.authService.restorePassword(action.payload).pipe(
        map(response => {
          console.log('SUCCESS!', response.error);

          return of(response);
        }),
        catchError(response => {
          console.log('ERRORE!', response.error);
          return of(response);
        }),
        flatMap(response => [
          new AuthActions.SetError(response.error ? response.error.error : response.error),
          new AuthActions.SetIsPasswordRestoreFinished(true),
          new AuthActions.SetFetching(false),
        ]),
      ),
    ),
  );

  constructor(private actions$: Actions,
              private authService: AuthService) {}
}

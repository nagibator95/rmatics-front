import {Injectable} from '@angular/core';
import {ofType, Actions, Effect} from '@ngrx/effects';
import {of, EMPTY} from 'rxjs';
import {catchError, flatMap, map, switchMap, tap} from 'rxjs/operators';

import {getCookie} from '../../../utils/cookies';

import * as AuthActions from './auth.actions';
import {FormattedApiResponse} from './models/formattedApiResponse.model';
import {AuthService} from './services/auth.service';
import {cookieNames, formatData, getDateNowInSeconds, setTokenResponseToCookies} from './util/util';

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
        catchError(response => {
          console.log('ERROR!');
          return of(formatData(response.error));
        }),
        flatMap((formattedData: FormattedApiResponse) => [
          new AuthActions.SetState(formattedData.state),
          new AuthActions.SetError(formattedData.error),
          new AuthActions.SetFetching(false),
          new AuthActions.SetIsLoggedIn(formattedData.statusCode === 200),
          new AuthActions.SetStatus(formattedData.status),
          new AuthActions.SetStatusCode(formattedData.statusCode),
          new AuthActions.SetTokenResponseToCookies({item: formattedData.state, rememberMe: action.payload.rememberMe}),
        ]),
      ),
    ),
  );

  @Effect({dispatch: false})
  setTokenResponseToCookies$ = this.actions$.pipe(
    ofType(AuthActions.Types.SetTokenResponseToCookies),
    tap((action: AuthActions.SetTokenResponseToCookies) => setTokenResponseToCookies(action.payload.item, action.payload.rememberMe)),
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
      }

      return new AuthActions.SetIsLoggedIn(false);
    }),
  );

  @Effect()
  initializeState$ = this.actions$.pipe(
    ofType(AuthActions.Types.InitializeState),
    flatMap((action: AuthActions.InitializeState) => [
      new AuthActions.SetState(action.payload),
      new AuthActions.SetIsLoggedIn(true),
    ]),
  );

  constructor(private actions$: Actions,
              private authService: AuthService) {}
}

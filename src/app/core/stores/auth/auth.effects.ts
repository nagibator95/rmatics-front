import {Injectable} from '@angular/core';
import {ofType, Actions, Effect} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, flatMap, map, switchMap, tap} from 'rxjs/operators';

import * as AuthActions from './auth.actions';
import {FormattedApiResponse} from './models/formattedApiResponse.model';
import {AuthService} from './services/auth.service';
import {formatData, setTokenResponseToCookies} from './util/util';

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
  initialize = this.actions$.pipe(
    ofType(AuthActions.Types.Initialize),

  );

  constructor(private actions$: Actions,
              private authService: AuthService) {}
}

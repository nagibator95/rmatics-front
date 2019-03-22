import {Action} from '@ngrx/store';

import {AuthState} from './models/authState.model';

export enum Types {
  SetFetching = '[Auth] SetFetching',
  SetIsLoggedIn = '[Auth] SetIsLoggedIn',
  SetState = '[Auth] SetState',
  SetError = '[Auth] SetError',
  Login = '[Auth] Login',
  Initialize = '[Auth] Initialize',
  RefreshToken = '[Auth] RefreshToken',
  Logout = '[Auth] Logout',
}

export class Login implements Action {
  readonly type = Types.Login;
}

export class Initialize implements Action {
  readonly type = Types.Initialize;
}

export class RefreshToken implements Action {
  readonly type = Types.RefreshToken;
}

export class Logout implements Action {
  readonly type = Types.Logout;
}

export class SetFetching implements Action {
  readonly type = Types.SetFetching;

  constructor(public payload: boolean) {}
}

export class SetIsLoggedIn implements Action {
  readonly type = Types.SetIsLoggedIn;

  constructor(public payload: boolean) {}
}

export class SetState implements Action {
  readonly type = Types.SetState;

  constructor(public payload: AuthState) {}
}

export class SetError implements Action {
  readonly type = Types.SetError;

  constructor(public payload: string) {}
}

export type All = SetFetching | SetIsLoggedIn | SetState | SetError | Login | Initialize | RefreshToken | Logout;

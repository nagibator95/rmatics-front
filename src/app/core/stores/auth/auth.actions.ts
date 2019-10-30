import {Params} from '@angular/router';
import {Action} from '@ngrx/store';

import {IAuthData} from './models/authData.model';
import {IAuthState} from './models/authState.model';
import {ICookies} from './models/cookies.model';
import {ILoginPayload} from './models/loginPayload.model';
import {IRestorePasswordPayload} from './models/restorePasswordPayload.model';

export enum Types {
    SetFetching = '[Auth] SetFetching',
    SetIsLoggedIn = '[Auth] SetIsLoggedIn',
    SetState = '[Auth] SetState',
    SetError = '[Auth] SetError',
    SetStatus = '[Auth] SetStatus',
    SetStatusCode = '[Auth] SetStatusCode',
    SetIsPasswordRestoreFinished = '[Auth] SetIsPasswordRestoreFinished',
    SetIsPasswordChangeFinished = '[Auth] SetIsPasswordChangeFinished',
    SetWholeState = '[Auth] SetWholeState',
    SetCookies = '[Auth] SetCookies',
    Login = '[Auth] Login',
    QueryLogin = '[Auth] QueryLogin',
    Initialize = '[Auth] Initialize',
    InitializeState = '[Auth] InitializeState',
    RefreshToken = '[Auth] RefreshToken',
    Logout = '[Auth] Logout',
    QueryLogout = '[Auth] QueryLogout',
    SetTokenResponseToCookies = '[Auth] SetTokenResponseToCookies',
    EraseLoginState = '[Auth] EraseLoginState',
    ProvideHeaders = '[Auth] ProvideHeaders',
    NoTokenRefreshNeeded = '[Auth] NoTokenRefreshNeeded',
    RestorePassword = '[Auth] RestorePassword',
    QueryRestorePassword = '[Auth] QueryRestorePassword',
    ChangePassword = '[Auth] ChangePassword',
    QueryChangePassword = '[Auth] QueryChangePassword',
}

export class Login implements Action {
    readonly type = Types.Login;

    constructor(public payload: ILoginPayload) {}
}

export class QueryLogin implements Action {
    readonly type = Types.QueryLogin;

    constructor(public payload: ILoginPayload) {}
}

export class SetTokenResponseToCookies implements Action {
    readonly type = Types.SetTokenResponseToCookies;

    constructor(public payload: {item?: IAuthData; rememberMe?: boolean}) {}
}

export class Initialize implements Action {
    readonly type = Types.Initialize;
}

export class InitializeState implements Action {
    readonly type = Types.InitializeState;

    constructor(public payload: IAuthData) {}
}

export class RefreshToken implements Action {
    readonly type = Types.RefreshToken;
}

export class Logout implements Action {
    readonly type = Types.Logout;
}

export class QueryLogout implements Action {
    readonly type = Types.QueryLogout;
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

    constructor(
        public payload: IAuthData | undefined,
        public isRefresh?: boolean,
        public isInitial?: boolean,
    ) {}
}

export class SetError implements Action {
    readonly type = Types.SetError;

    constructor(public payload: string | undefined) {}
}

export class SetStatus implements Action {
    readonly type = Types.SetStatus;

    constructor(public payload: string) {}
}

export class SetStatusCode implements Action {
    readonly type = Types.SetStatusCode;

    constructor(public payload: number) {}
}

export class SetIsPasswordRestoreFinished implements Action {
    readonly type = Types.SetIsPasswordRestoreFinished;

    constructor(public payload: boolean) {}
}

export class SetIsPasswordChangeFinished implements Action {
    readonly type = Types.SetIsPasswordChangeFinished;

    constructor(public payload: boolean) {}
}

export class SetCookies implements Action {
    readonly type = Types.SetCookies;

    constructor(public payload: ICookies) {}
}

export class EraseLoginState implements Action {
    readonly type = Types.EraseLoginState;

    constructor(public payload: ICookies) {}
}

export class ProvideHeaders implements Action {
    readonly type = Types.ProvideHeaders;
}

export class SetWholeState implements Action {
    readonly type = Types.SetWholeState;

    constructor(public payload: IAuthState) {}
}

export class NoTokenRefreshNeeded implements Action {
    readonly type = Types.NoTokenRefreshNeeded;
}

export class RestorePassword implements Action {
    readonly type = Types.RestorePassword;

    constructor(public payload: IRestorePasswordPayload) {}
}

export class QueryRestorePassword implements Action {
    readonly type = Types.QueryRestorePassword;

    constructor(public payload: IRestorePasswordPayload) {}
}

export class ChangePassword implements Action {
    readonly type = Types.ChangePassword;

    constructor(public payload: {password: string; params: Params}) {}
}

export class QueryChangePassword implements Action {
    readonly type = Types.QueryChangePassword;

    constructor(public payload: {password: string; params: Params}) {}
}

export type All =
    | SetFetching
    | SetIsLoggedIn
    | SetState
    | SetError
    | SetStatus
    | SetStatusCode
    | SetCookies
    | QueryRestorePassword
    | SetWholeState
    | Login
    | ProvideHeaders
    | RestorePassword
    | QueryLogout
    | Initialize
    | InitializeState
    | SetIsPasswordRestoreFinished
    | RefreshToken
    | Logout
    | QueryLogin
    | SetTokenResponseToCookies
    | EraseLoginState
    | NoTokenRefreshNeeded
    | ChangePassword
    | QueryChangePassword
    | SetIsPasswordChangeFinished;

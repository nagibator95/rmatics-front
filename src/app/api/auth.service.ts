import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, EMPTY, Observable } from 'rxjs';
import { catchError, finalize, map, mapTo, share, switchMap, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { deleteCookie, getCookie, writeCookie } from '../utils/cookies';
import { ApiResponse } from '../utils/types';
import { Store } from '../utils/Store';

const getDateNowInSeconds = () => Math.floor(Date.now() / 1000);

const expiredAccessTokenTime = 15;
const expiredRefreshTokenTime = 43800;

const formatData = (response: ApiResponse<ApiAuth>) => {
  const { data, error, status_code, status } = response;

  const state = data !== undefined
    ? {
      login: data.username,
      firstName: data.firstname,
      lastName: data.lastname,
      email: data.email,
      token: data.token,
      refreshToken: data.refresh_token,
    }
    : undefined;

  return {
    state,
    statusCode: status_code,
    status,
    error,
  };
};

const cookieNames = {
  accessToken: 'access_token',
  refreshToken: 'refresh_token',
  accessTokenExpTime: 'expired',
  refreshTokenExpTime: 'expired_refresh_token',
  login: 'login',
  firstName: 'first_name',
  lastName: 'last_name',
  email: 'email',
  rememberMe: 'remember_me',
};

const setCookies = (item: Cookies) => {
  Object.keys(item)
    .map(key => key as 'accessToken' | 'refreshToken')
    .forEach(key => {
      if (item === undefined) {
        deleteCookie(cookieNames[key]);
      } else {
        writeCookie(cookieNames[key], item[key] as string);
      }
    });
};

const constructHeaders = ({ accessToken, refreshToken }: { accessToken?: string, refreshToken?: string }) => {
  const accessTokenHeader = Boolean(accessToken) ? {
    'Authorization': 'JVT ' + accessToken,
  } : {};

  const refreshTokenHeader = Boolean(refreshToken) ? {
    'Refresh-Token': refreshToken,
  } : {};

  return {
    ...accessTokenHeader,
    ...refreshTokenHeader,
  };
};

const setTokenResponseToCookies = (item?: AuthData, rememberMe?: boolean) => {
  const rememberData = item !== undefined && rememberMe ? {
    login: item.login,
    firstName: item.firstName,
    lastName: item.lastName,
    email: item.email,
  } : {};

  setCookies({
    accessToken: item !== undefined ? item.token : undefined,
    refreshToken: item !== undefined ? item.refreshToken : undefined,
    accessTokenExpTime: getDateNowInSeconds() + expiredAccessTokenTime * 60,
    refreshTokenExpTime: getDateNowInSeconds() + expiredRefreshTokenTime * 60,
    rememberMe: Boolean(rememberMe),
    ...rememberData,
  });
};

interface AuthHeaders {
  'Access-Token': string;

  [key: string]: string;
}

export interface ApiAuth {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  token: string;
  refresh_token: string;
}

export interface AuthData {
  login?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  token?: string;
  refreshToken?: string;
}

interface AuthState {
  state?: AuthData;
  isLoggedIn: boolean;
  statusCode: number;
  status: string;
  error?: string;
  isFetching: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  state: undefined,
  statusCode: 200,
  status: 'success',
  error: '',
  isFetching: false,
};

export interface Cookies {
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpTime?: number;
  refreshTokenExpTime?: number;
  login?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  rememberMe: boolean;
}

export const notAuthenticatedCookies: Cookies = {
  accessToken: undefined,
  refreshToken: undefined,
  accessTokenExpTime: undefined,
  refreshTokenExpTime: undefined,
  login: undefined,
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  rememberMe: false,
};

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private store = new Store<AuthState>(initialState);
  private tokenRefreshingInProgress: Observable<AuthState> = EMPTY;
  error = this.store.state.pipe(map(state => state.error));
  isFetching = this.store.state.pipe(map(state => state.isFetching));
  isLoggedIn = this.store.state.pipe(map(state => state.isLoggedIn));

  constructor(private http: HttpClient) {}

  login(authData: { username: string, password: string }, rememberMe?: boolean) {
    this.store.setState(of({
      ...this.store.getState(),
      isFetching: true,
    }));

    const nextState = this.http.post<ApiResponse<ApiAuth>>(environment.apiUrl + '/auth/signin/', authData)
      .pipe(
        map(formatData),
        catchError(response => of(formatData(response.error))),
        map(state => ({
          ...this.store.getState(),
          ...state,
          isFetching: false,
          isLoggedIn: state.statusCode === 200,
        })),
        tap(response => setTokenResponseToCookies(response.state, rememberMe)),
      );

    this.store.setState(nextState);
  }

  provideHeaders() {
    const dateNowInSeconds = getDateNowInSeconds();
    const accessTokenExpTime = +(getCookie(cookieNames.accessTokenExpTime) || 0);
    const refreshTokenExpTime = +(getCookie(cookieNames.refreshTokenExpTime) || 0);

    if (accessTokenExpTime > dateNowInSeconds) {
      return of(<AuthHeaders>constructHeaders({
        accessToken: getCookie(cookieNames.accessToken),
      }));
    } else if (refreshTokenExpTime > dateNowInSeconds) {
      return this.refreshToken().pipe(
        map(() => <AuthHeaders>constructHeaders({
          accessToken: getCookie(cookieNames.accessToken),
        })),
      );
    } else {
      this.eraseLoggedInState();

      return EMPTY;
    }
  }

  eraseLoggedInState(error?: string) {
    setCookies(notAuthenticatedCookies);
    this.store.setState(of({
      ...this.store.getState(),
      isLoggedIn: false,
      error,
    }));
  }

  init() {
    const rememberMe = getCookie(cookieNames.rememberMe);
    const currentState = this.store.getState();

    if (rememberMe === 'true') {
      this.store.setState(of({
        ...currentState,
        state: {
          token: getCookie(cookieNames.accessToken),
          refreshToken: getCookie(cookieNames.refreshToken),
          login: getCookie(cookieNames.login),
          firstName: getCookie(cookieNames.firstName),
          lastName: getCookie(cookieNames.lastName),
          email: getCookie(cookieNames.email),
        },
        isLoggedIn: true,
      }));
    }
  }

  refreshToken() {
    if (this.tokenRefreshingInProgress === null) {
      this.tokenRefreshingInProgress =
        this.http.post<ApiResponse<ApiAuth>>(environment.apiUrl + '/auth/refresh/',
          { refresh_token: getCookie(cookieNames.refreshToken) })
          .pipe(
            map(formatData),
            catchError(response => of(formatData(response.error))),
            map(state => ({
              ...this.store.getState(),
              ...state,
              isFetching: false,
              isLoggedIn: state.statusCode === 200,
            })),
            tap(response => setTokenResponseToCookies(response.state)),
            finalize(() => {
              this.tokenRefreshingInProgress = EMPTY;
            }),
            share(),
          );
    }

    return this.tokenRefreshingInProgress;
  }

  logout() {
    const nextState = this.provideHeaders().pipe(
      switchMap(_headers => this.http.post(environment.apiUrl + '/auth/signout/', {})),
      mapTo({
        ...this.store.getState(),
        isLoggedIn: false,
      }),
      tap(() => setCookies(notAuthenticatedCookies)),
    );

    this.store.setState(nextState);
  }

  clearError() {
    this.store.setState(of({
      ...this.store.getState(),
      error: undefined,
    }));
  }
}

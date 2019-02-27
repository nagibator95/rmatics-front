import { Injectable } from '@angular/core';
import { of, EMPTY, Observable } from 'rxjs';
import { finalize, map, mapTo, share, switchMap, tap } from 'rxjs/operators';

import { deleteCookie, getCookie, writeCookie } from '../utils/cookies';
import { fakeHTTPRequest } from '../utils/fakeHTTPRequest';
import { Store } from '../utils/Store';

import { fakeLogIn, fakeRefresh, formatData } from './auth.fetcher';

const getDateNowInSeconds = () => Math.floor(Date.now() / 1000);

const expiredAccessTokenTime = 15;
const expiredRefreshTokenTime = 43800;

const cookieNames = {
  accessToken: 'access_token',
  refreshToken: 'refresh_token',
  accessTokenExpTime: 'expired',
  refreshTokenExpTime: 'expired_refresh_token',
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
    'Access-Token': accessToken,
  } : {};

  const refreshTokenHeader = Boolean(refreshToken) ? {
    'Refresh-Token': refreshToken,
  } : {};

  return {
    ...accessTokenHeader,
    ...refreshTokenHeader,
  };
};

const setTokenResponseToCookies = (item?: AuthData) => setCookies({
  accessToken: item !== undefined ? item.token : null,
  refreshToken: item !== undefined  ? item.refreshToken : null,
  accessTokenExpTime: getDateNowInSeconds() + expiredAccessTokenTime * 60,
  refreshTokenExpTime: getDateNowInSeconds() + expiredRefreshTokenTime * 60,
});

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
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  token: string;
  refreshToken: string;
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
  accessToken: string | null;
  refreshToken: string | null;
  accessTokenExpTime: number | null;
  refreshTokenExpTime: number | null;
}

export const notAuthenticatedCookies: Cookies = {
  accessToken: null,
  refreshToken: null,
  accessTokenExpTime: null,
  refreshTokenExpTime: null,
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

  constructor() {}

  login({ username, password }: { username: string, password: string }) {
    const currentState = this.store.getState();

    this.store.setState(of({
      ...this.store.getState(),
      isFetching: true,
    }));

    const nextState = fakeHTTPRequest(formatData(fakeLogIn(username, password))).pipe(
      tap(response => setTokenResponseToCookies(response.state)),
      map(response => ({
        ...currentState,
        ...response,
        isFetching: false,
        isLoggedIn: response.statusCode === 200,
      })),
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

  refreshToken() {
    if (this.tokenRefreshingInProgress === null) {
      this.tokenRefreshingInProgress = fakeHTTPRequest(formatData(fakeRefresh(getCookie(cookieNames.refreshToken)))).pipe(
        tap(response => setTokenResponseToCookies(response.state)),
        map(response => ({
          ...this.store.getState(),
          ...response,
          isLoggedIn: response.statusCode === 200,
        })),
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
      switchMap(_headers => fakeHTTPRequest(null)),
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

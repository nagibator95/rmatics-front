import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {environment} from '../../../../../environments/environment';
import {ApiAuth} from '../models/apiAuth.model';
import {ApiResponse} from '../models/apiResponse.model';
import {LoginAuthData} from '../models/loginPayload.model';
import {cookieNames, getCookie} from '../util/util';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  // private store = new Store<AuthState>(initialState);
  // error = this.store.state.pipe(map(state => state.error));
  // isFetching = this.store.state.pipe(map(state => state.isFetching));
  // isLoggedIn = this.store.state.pipe(map(state => state.isLoggedIn));

  constructor(private http: HttpClient) {}

  login(authData: LoginAuthData): Observable<ApiResponse<ApiAuth>> {
    return this.http.post<ApiResponse<ApiAuth>>(environment.apiUrl + '/auth/signin/', authData);
  }

  // provideHeaders() {
  //   const dateNowInSeconds = getDateNowInSeconds();
  //   const accessTokenExpTime = +(getCookie(cookieNames.accessTokenExpTime) || 0);
  //   const refreshTokenExpTime = +(getCookie(cookieNames.refreshTokenExpTime) || 0);
  //
  //   if (accessTokenExpTime > dateNowInSeconds) {
  //     return of(<AuthHeaders>constructHeaders({
  //       accessToken: getCookie(cookieNames.accessToken),
  //     }));
  //   } else if (refreshTokenExpTime > dateNowInSeconds) {
  //     return this.refreshToken().pipe(
  //       map(state => {
  //         this.store.setState(of(state));
  //         return <AuthHeaders>constructHeaders({
  //           accessToken: getCookie(cookieNames.accessToken),
  //         });
  //       }),
  //     );
  //   } else {
  //     this.eraseLoggedInState();
  //
  //     return EMPTY;
  //   }
  // }
  //
  // eraseLoggedInState(error?: string) {
  //   setCookies(notAuthenticatedCookies);
  //   this.store.setState(of({
  //     ...this.store.getState(),
  //     isLoggedIn: false,
  //     error,
  //   }));
  // }
  //
  // init() {
  //   const dateNowInSeconds = getDateNowInSeconds();
  //   const accessTokenExpTime = +(getCookie(cookieNames .accessTokenExpTime) || 0);
  //   const rememberMe = getCookie(cookieNames.rememberMe);
  //   const token = getCookie(cookieNames.accessToken);
  //
  //   if (rememberMe === 'true' && token) {
  //     if (accessTokenExpTime > dateNowInSeconds) {
  //       this.store.setState(of({
  //         ...this.store.getState(),
  //         state: {
  //           token: getCookie(cookieNames.accessToken),
  //           refreshToken: getCookie(cookieNames.refreshToken),
  //           login: getCookie(cookieNames.login),
  //           firstName: getCookie(cookieNames.firstName),
  //           lastName: getCookie(cookieNames.lastName),
  //           email: getCookie(cookieNames.email),
  //         },
  //         isLoggedIn: true,
  //       }));
  //     } else {
  //       const nextState = this.refreshToken();
  //       this.store.setState(nextState);
  //     }
  //   }
  // }
  //
  refreshToken(): Observable<ApiResponse<ApiAuth>> {
    return this.http.post<ApiResponse<ApiAuth>>(environment.apiUrl + '/auth/refresh/',
      { refresh_token: getCookie(cookieNames.refreshToken) });
  }
  //
  // logout() {
  //   return this.provideHeaders().pipe(
  //     switchMap(_headers => this.http.post(environment.apiUrl + '/auth/signout/', {})),
  //   );
  // }
  //
  // clearError() {
  //   this.store.setState(of({
  //     ...this.store.getState(),
  //     error: undefined,
  //   }));
  // }
}

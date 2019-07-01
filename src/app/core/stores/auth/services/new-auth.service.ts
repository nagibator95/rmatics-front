import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {AuthActions} from '../index';
import {ApiResponse} from '../models/apiResponse.model';
import {ApiAuth} from '../models/apiAuth.model';
import {environment} from '../../../../../environments/environment';
import {LoginAuthData} from '../models/loginPayload.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

export interface User {
  firstname: string;
  lastname: string;
  token: string;
  refresh_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class NewAuthService {
  private readonly signInUrl = `/api/v1/user/signin`;
  private readonly refreshUrl = `/api/v1/user/refresh`;
  private readonly accessTokenKey = 'token';
  private readonly refreshTokenKey = 'refresh_token';
  readonly firstnameKey = 'firstname';
  readonly lastnameKey = 'lastname';

  readonly teacherUrl = '/publications';
  readonly studentUrl = '/my-courses';
  readonly mentorUrl = '/supervision';

  user: User;

  constructor(private http: HttpClient,
              private store$: Store<any>) {
  }

  private decodeUser(token: string = localStorage.token): User {
    let user: any;
    if (!token) {
      return null;
    }
    try { // if localStorage.token has not base-64 format
      user = JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.warn(e);
      return null;
    }

    return {
      firstname: user.firstname,
      lastname: user.lastname,
      token: this.accessToken,
      refresh_token: this.refreshToken,
    };
  }

  private saveUserTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  private saveUserName(firstName: string, lastName: string) {
    localStorage.setItem(this.firstnameKey, firstName);
    localStorage.setItem(this.lastnameKey, lastName);
  }

  private deleteUserTokens() {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  private deleteUserName() {
    localStorage.removeItem(this.firstnameKey);
    localStorage.removeItem(this.lastnameKey);
  }

  get accessToken(): string {
    return localStorage.getItem(this.accessTokenKey) || null;
  }

  get refreshToken(): string {
    return localStorage.getItem(this.refreshTokenKey);
  }

  get userFullName() {
    return `${localStorage.getItem(this.firstnameKey)} ${localStorage.getItem(this.lastnameKey)}`;
  }

  get isLoggedIn() {
    return !!this.accessToken;
  }

  get currentUser(): User {
    if (!this.user) {
      this.user = this.decodeUser(this.accessToken);
    }

    return this.user;
  }

  initUser() {
    this.store$.dispatch(new AuthActions.SetIsLoggedIn(this.isLoggedIn));
  }

  login(authData: LoginAuthData): Observable<User> {
    return this.http.post<ApiResponse<ApiAuth>>(environment.apiUrl + '/auth/signin/', authData)
      .pipe(
        map((response: ApiResponse<ApiAuth>) => {
          this.saveUserTokens(response.data.token, response.data.refresh_token);
          this.saveUserName(response.data.firstname, response.data.lastname);
          this.user = this.decodeUser(response.data.token);
          this.store$.dispatch(new AuthActions.SetIsLoggedIn(this.isLoggedIn));
          return this.user;
        }),
      );
  }

  logout(): Observable<boolean> {
    this.deleteUserTokens();
    this.deleteUserName();
    this.store.dispatch(new LogoutAction());
    this.store.dispatch(new CoursesCleaned());
    this.store.dispatch(new CleanUnits());
    return of(true);
  }

  performTokenRefresh(): Observable<IAuthUser> {
    const refreshToken = this.refreshToken;
    const data = { refresh_token: refreshToken };
    this.deleteUserTokens();
    return this.http.post(this.refreshUrl, data)
      .pipe(
        map((authResponse: IAuthResponse) => {
          const user = authResponse.data as IAuthUser;
          // Note that RefreshAPI doesn't return refresh
          // token as well and we have to preserve existing one
          this.saveUserTokens(user.token, refreshToken);
          return user;
        }),
      );
  }
}

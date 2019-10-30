import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Params} from '@angular/router';
import {of, Observable} from 'rxjs';

import {environment} from '../../../../../environments/environment';
import {ProvideHeadersActions} from '../enum/provideHeadersActions.enum';
import {IApiAuth} from '../models/apiAuth.model';
import {IApiResponse} from '../models/apiResponse.model';
import {ILoginAuthData} from '../models/loginPayload.model';
import {IRestorePasswordPayload} from '../models/restorePasswordPayload.model';
import {
    constructHeaders,
    cookieNames,
    getCookie,
    getDateNowInSeconds,
} from '../util/util';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) {}

    login(authData: ILoginAuthData): Observable<IApiResponse<IApiAuth>> {
        return this.http.post<IApiResponse<IApiAuth>>(
            environment.apiUrl + '/auth/signin/',
            authData,
        );
    }

    provideHeaders(): Observable<{
        headers: IAuthHeaders | {};
        action: ProvideHeadersActions;
    }> {
        const dateNowInSeconds = getDateNowInSeconds();
        const accessTokenExpTime = +(getCookie(cookieNames.accessTokenExpTime) || 0);
        const refreshTokenExpTime = +(getCookie(cookieNames.refreshTokenExpTime) || 0);

        if (accessTokenExpTime > dateNowInSeconds) {
            return of({
                headers: <IAuthHeaders>constructHeaders({
                    accessToken: getCookie(cookieNames.accessToken),
                }),
                action: ProvideHeadersActions.NoTokenRefresh,
            });
        } else if (refreshTokenExpTime > dateNowInSeconds) {
            return of({
                headers: <IAuthHeaders>constructHeaders({
                    accessToken: getCookie(cookieNames.accessToken),
                }),
                action: ProvideHeadersActions.TokenRefresh,
            });
        } else {
            return of({
                headers: {},
                action: ProvideHeadersActions.EmptyHeaders,
            });
        }
    }

    refreshToken(): Observable<IApiResponse<IApiAuth>> {
        return this.http.post<IApiResponse<IApiAuth>>(
            environment.apiUrl + '/auth/refresh/',
            {refresh_token: getCookie(cookieNames.refreshToken)},
        );
    }

    restorePassword(data: IRestorePasswordPayload): Observable<any> {
        return this.http.post(environment.apiUrl + '/auth/reset/', data);
    }

    changePassword(data: {password: string}, params: Params): Observable<any> {
        return this.http.post(environment.apiUrl + '/auth/change-password', data, {
            params: params,
        });
    }

    logout(): Observable<any> {
        return this.http.post(environment.apiUrl + '/auth/signout/', {
            refresh_token: getCookie(cookieNames.refreshToken),
        });
    }
}

import {ApiAuth} from '../models/apiAuth.model';
import {ApiResponse} from '../models/apiResponse.model';
import {AuthData} from '../models/authData.model';
import {Cookies} from '../models/cookies.model';
import {FormattedApiResponse} from '../models/formattedApiResponse.model';

export const getCookie = (name: string) => {
  const matches = document.cookie.match(new RegExp(
    '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)',
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const writeCookie = (name: string, value: string) => {
  document.cookie = `${name}=${value}; Path=/`;
};

export const deleteCookie = (name: string) => {
  document.cookie = `${name}=; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

export const getDateNowInSeconds = () => Math.floor(Date.now() / 1000);

export const expiredAccessTokenTime = 15;
export const expiredRefreshTokenTime = 43800;

export const cookieNames = {
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

export const formatData = (response: ApiResponse<ApiAuth>): FormattedApiResponse => {
  console.log(response);
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

export const setCookies = (item: Cookies) => {
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

export const constructHeaders = ({ accessToken, refreshToken }: { accessToken?: string, refreshToken?: string }) => {
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

export const setTokenResponseToCookies = (item?: AuthData, rememberMe?: boolean) => {
  const rememberData = item !== undefined && Boolean(rememberMe) ? {
    login: item.login,
    firstName: item.firstName,
    lastName: item.lastName,
    email: item.email,
  } : {};

  setCookies({
    accessToken: item !== undefined ? item.token : '',
    refreshToken: item !== undefined ? item.refreshToken : '',
    accessTokenExpTime: getDateNowInSeconds() + expiredAccessTokenTime * 60,
    refreshTokenExpTime: getDateNowInSeconds() + expiredRefreshTokenTime * 60,
    rememberMe: Boolean(rememberMe),
    ...rememberData,
  });
};

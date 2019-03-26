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
  accessToken: '',
  refreshToken: '',
  accessTokenExpTime: undefined,
  refreshTokenExpTime: undefined,
  login: '',
  firstName: '',
  lastName: '',
  email: '',
  rememberMe: false,
};

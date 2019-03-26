export interface LoginPayload {
  authData: LoginAuthData;
  rememberMe?: boolean;
}

export interface LoginAuthData {
  username: string;
  password: string;
}

export interface ILoginPayload {
    authData: ILoginAuthData;
    rememberMe?: boolean;
}

export interface ILoginAuthData {
    username: string;
    password: string;
}

import {IAuthData} from './authData.model';

export interface IAuthState {
    state?: IAuthData;
    isLoggedIn: boolean;
    statusCode: number;
    status: string;
    error?: string;
    isFetching: boolean;
    isPasswordRestoreFinished: boolean;
    isPasswordChangeFinished: boolean;
}

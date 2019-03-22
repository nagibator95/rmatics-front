import {AuthData} from './authData.model';

export interface AuthState {
  state?: AuthData;
  isLoggedIn: boolean;
  statusCode: number;
  status: string;
  error?: string;
  isFetching: boolean;
}

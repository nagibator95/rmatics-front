import {AuthData} from './authData.model';

export interface FormattedApiResponse {
  state: AuthData | undefined;
  statusCode: number;
  status: string;
  error: string | undefined;
}

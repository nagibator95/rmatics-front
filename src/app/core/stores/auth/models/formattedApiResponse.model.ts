import {IAuthData} from './authData.model';

export interface IFormattedApiResponse {
    state: IAuthData | undefined;
    statusCode: number;
    status: string;
    error: string | undefined;
}

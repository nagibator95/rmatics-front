import {IApiAuth} from '../stores/auth/models/apiAuth.model';
import {IApiResponse} from '../stores/auth/models/apiResponse.model';

export const changePasswordMock: IApiResponse<IApiAuth> = {
    status_code: 200,
    data: {
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        token: '',
        refresh_token: '',
    },
    status: '',
    error: '',
};

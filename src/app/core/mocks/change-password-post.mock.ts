import {ApiAuth} from '../stores/auth/models/apiAuth.model';
import {ApiResponse} from '../stores/auth/models/apiResponse.model';

export const changePasswordMock: ApiResponse<ApiAuth> = {
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

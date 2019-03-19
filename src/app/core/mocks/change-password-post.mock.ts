import {ApiAuth} from '../../api/auth.service';
import {ApiResponse} from '../../utils/types';

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

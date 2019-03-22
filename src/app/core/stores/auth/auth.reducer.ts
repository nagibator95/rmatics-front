import * as StoreActions from './auth.actions';
import {AuthState} from './models/authState.model';

const initialState: AuthState = {
  isLoggedIn: false,
  state: undefined,
  statusCode: 200,
  status: 'success',
  error: '',
  isFetching: false,
};

export function authReducer(state: AuthState = initialState, action: StoreActions.All): any {
  switch (action.type) {
    case StoreActions.Types.SetError:
      return {
        ...state,
        error: action.payload,
      };
    case StoreActions.Types.SetFetching:
      return {
        ...state,
        isFetching: action.payload,
      };
    case StoreActions.Types.SetIsLoggedIn:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case StoreActions.Types.SetState:
      return {
        ...state,
        state: action.payload,
      };
    default:
      return state;
  }
}

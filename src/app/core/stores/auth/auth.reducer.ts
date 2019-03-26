import * as StoreActions from './auth.actions';
import {AuthState} from './models/authState.model';

export const initialState: AuthState = {
  isLoggedIn: false,
  state: undefined,
  statusCode: 200,
  status: 'success',
  error: '',
  isFetching: false,
};

export function authReducer(state: AuthState = initialState, action: StoreActions.All): AuthState {
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

    case StoreActions.Types.SetStatus:
      return {
        ...state,
        status: action.payload,
      };

    case StoreActions.Types.SetStatusCode:
      return {
        ...state,
        statusCode: action.payload,
      };

    case StoreActions.Types.SetWholeState:
      return action.payload;

    default:
      return state;
  }
}

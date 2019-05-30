import * as StoreActions from './contest.actions';
import {ContestState} from './models/models';

export const initialState: ContestState = {
  contest: undefined,
  problem: undefined,
  submissions: [],
  statusCode: 200,
  status: 'success',
  fileError: '',
  error: '',
  isFetching: false,
  isSubmissionsFetching: false,
};

export function contestReducer(state: ContestState = initialState, action: StoreActions.All): ContestState {
  switch (action.type) {
    case StoreActions.Types.SetFetching:
      return {
        ...state,
        isFetching: action.payload,
      };

    default:
      return state;
  }
}

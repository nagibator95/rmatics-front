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
  contestData: undefined,
};

export function contestReducer(state: ContestState = initialState, action: StoreActions.All): ContestState {
  switch (action.type) {
    case StoreActions.Types.SetFetching:
      return {
        ...state,
        isFetching: action.payload,
      };

    case StoreActions.Types.SetContestData:
      return {
        ...state,
        contestData: action.payload,
      };

    case StoreActions.Types.SetStatus:
      return {
        ...state,
        status: action.payload,
      };

    case StoreActions.Types.SetError:
      return {
        ...state,
        error: action.payload,
      };

    case StoreActions.Types.SetStatusCode:
      return {
        ...state,
        statusCode: action.payload,
      };

    case StoreActions.Types.SetContest:
      return {
        ...state,
        contest: action.payload,
      };

    case StoreActions.Types.SetIsSubmissionFetching:
      return {
        ...state,
        isFetching: action.payload,
      };

    case StoreActions.Types.SetProblem:
      return {
        ...state,
        problem: action.payload,
      };

    case StoreActions.Types.SetSubmissions:
      return {
        ...state,
        submissions: action.payload,
      };

    default:
      return state;
  }
}

import * as StoreActions from './contest.actions';
import {ContestState} from './models/models';

export const initialState: ContestState = {
  contest: undefined,
  problem: undefined,
  submissions: [],
  submissionPreview: undefined,
  statusCode: 200,
  status: 'success',
  fileError: '',
  error: '',
  isFetching: false,
  isSubmissionsFetching: false,
  contestData: undefined,
  submissionState: {
    protocol: {
      statusCode: 200,
      status: 'success',
      error: '',
      isFetching: false,
    },
    source: {
      statusCode: 200,
      status: 'success',
      error: '',
      isFetching: false,
    },
    comments: {
      statusCode: 200,
      status: 'success',
      error: '',
      isFetching: false,
    },
  },
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
        isSubmissionsFetching: action.payload,
      };

    case StoreActions.Types.SetProblem:
      return {
        ...state,
        problem: action.payload,
      };

    case StoreActions.Types.SetSubmissions:
      return action.page === 1 ? {
        ...state,
        submissions: action.submissions,
      } : {
        ...state,
        submissions: [
          ...state.submissions,
          ...action.submissions,
        ],
      };

    case StoreActions.Types.SetFileError:
      return {
        ...state,
        fileError: action.payload,
      };

    case StoreActions.Types.SetSpecificSubmissionFetching:
      return {
        ...state,
        submissionState: {
          ...state.submissionState,
          [action.specifity]: {
            ...state.submissionState[action.specifity],
            isFetching: action.isFetching,
          },
        },
      };

    case StoreActions.Types.SetSpecificSubmissionPart:
      return {
        ...state,
        submissionState: {
          ...state.submissionState,
          [action.specifity]: action.part,
        },
      };

    case StoreActions.Types.SetSubmissionPreview:
      return {
        ...state,
        submissionPreview: state.submissions.find(val => val.id === action.payload),
      };

    case StoreActions.Types.ClearFileError:
      return {
        ...state,
        fileError: '',
      };

    default:
      return state;
  }
}

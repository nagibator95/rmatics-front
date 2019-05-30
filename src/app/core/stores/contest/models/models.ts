import {Contest, Problem, Submission} from '../../../../pages/contest/contest.types';

export interface ContestState {
  contest?: Contest;
  problem?: Problem;
  submissions: Submission[];
  statusCode: number;
  status: string;
  fileError?: string;
  error?: string;
  isFetching: boolean;
  isSubmissionsFetching: boolean;
}

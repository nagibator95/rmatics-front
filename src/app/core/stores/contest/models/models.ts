import {Contest, Problem, Submission} from '../types/contest.types';

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
  contestData: ContestData;
}

export interface ContestData {
  createdAt: string;
  timeStop: string;
  virtualDuration: number;
  isVirtual: boolean;
}

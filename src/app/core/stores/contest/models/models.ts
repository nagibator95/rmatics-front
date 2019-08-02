import {RunComment, RunProtocol, RunSource} from '../../../../pages/contest/contest.types';
import {Contest, Problem, Submission} from '../types/contest.types';

export interface ContestState {
  contest?: Contest;
  problem?: Problem;
  submissions: Submission[];
  submissionPreview: Submission;
  statusCode: number;
  status: string;
  fileError?: string;
  error?: string;
  isFetching: boolean;
  isSubmissionsFetching: boolean;
  contestData: ContestData;
  submissionState: SubmissionState;
}

export interface ContestData {
  createdAt: string;
  timeStop: string;
  virtualDuration: number;
  isVirtual: boolean;
  workshopId: number;
}

export interface SubmissionState {
  protocol: SpecificSubmissionState<RunProtocol>;
  source: SpecificSubmissionState<RunSource>;
  comments: SpecificSubmissionState<RunComment[]>;
  [key: string]: any;
}

export interface SpecificSubmissionState<T> {
  data?: T;
  statusCode: number;
  status: string;
  error?: string;
  isFetching: boolean;
}

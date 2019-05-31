import {Action} from '@ngrx/store';

import {ContestData} from './models/models';
import {Contest, Problem, Submission} from './types/contest.types';

export enum Types {
  SetFetching = '[Contest] SetFetching',
  GetContest = '[Contest] GetContest',
  QueryContest = '[Contest] QueryContest',
  SetContestData = '[Contest] SetContestData',
  SetStatus = '[Contest] SetStatus',
  SetStatusCode = '[Contest] SetStatusCode',
  SetError = '[Contest] SetError',
  SetContest = '[Contest] SetContest',
  CatchContestError = '[Contest] catchContestError',
  GetProblem = '[Contest] GetProblem',
  QueryProblem = '[Contest] QueryProblem',
  SetProblem = '[Contest] SetProblem',
  SetIsSubmissionFetching = '[Contest] SetIsSubmissionFetching',
  GetSubmissions = 'Contest] GetSubmissions',
  QuerySubmissions = '[Contest] QuerySubmissions',
  SetSubmissions = '[Contest] SetSubmissions',
}

export class SetFetching implements Action {
  readonly type = Types.SetFetching;

  constructor(public payload: boolean) {}
}

export class GetContest implements Action {
  readonly type = Types.GetContest;

  constructor(public payload: number) {}
}

export class QueryContest implements Action {
  readonly type = Types.QueryContest;

  constructor(public payload: number) {}
}

export class SetContestData implements Action {
  readonly type = Types.SetContestData;

  constructor(public payload: ContestData) {}
}

export class SetStatus implements Action {
  readonly type = Types.SetStatus;

  constructor(public payload: string) {}
}

export class SetStatusCode implements Action {
  readonly type = Types.SetStatusCode;

  constructor(public payload: number) {}
}

export class SetError implements Action {
  readonly type = Types.SetError;

  constructor(public payload: string | undefined) {}
}

export class SetContest implements Action {
  readonly type = Types.SetContest;

  constructor(public payload: Contest) {}
}

export class CatchContestError implements Action {
  readonly type = Types.CatchContestError;

  constructor(public payload: {error: string, status: string, status_code: number}) {}
}

export class GetProblem implements Action {
  readonly type = Types.GetProblem;

  constructor(public problemId: number, public contestId: number) {}
}

export class QueryProblem implements Action {
  readonly type = Types.QueryProblem;

  constructor(public problemId: number, public contestId: number) {}
}

export class SetProblem implements Action {
  readonly type = Types.SetProblem;

  constructor(public payload: Problem) {}
}

export class SetIsSubmissionFetching implements Action {
  readonly type = Types.SetIsSubmissionFetching;

  constructor(public payload: boolean) {}
}

export class GetSubmissions implements Action {
  readonly type = Types.GetSubmissions;

  constructor(public problemId: number, public page: number, public contestId: number) {}
}

export class QuerySubmissions implements Action {
  readonly type = Types.QuerySubmissions;

  constructor(public problemId: number, public page: number, public contestId: number) {}
}

export class SetSubmissions implements Action {
  readonly type = Types.QuerySubmissions;

  constructor(public payload: Submission[]) {}
}

export type All = SetFetching | GetContest | QueryContest | SetContestData | SetStatus | SetStatusCode | SetError
  | SetContest | CatchContestError | GetProblem | QueryProblem | SetProblem | SetIsSubmissionFetching | GetSubmissions
  | QuerySubmissions | SetSubmissions;

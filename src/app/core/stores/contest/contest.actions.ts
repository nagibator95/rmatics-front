import {Action} from '@ngrx/store';

export enum Types {
  SetFetching = '[Contest] SetFetching',
  GetContest = '[Contest] GetContest',
  QueryContest = '[Contest] QueryContest',
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

export type All = SetFetching | GetContest | QueryContest;

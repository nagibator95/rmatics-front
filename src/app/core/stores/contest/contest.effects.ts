import {Injectable} from '@angular/core';
import {ofType, Actions, Effect} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, flatMap, map, switchMap, tap} from 'rxjs/operators';

import {ProblemApi, SubmissionApi} from '../../../pages/contest/contest.types';
import {StatementApi} from '../../../shared/types/contest.types';

import * as ContestActions from './contest.actions';
import {ContestService} from './services/contest.service';
import {formatContest, formatProblem, formatSubmission} from './util/util';

@Injectable()
export class ContestEffects {
  @Effect()
  getContest$ = this.actions$.pipe(
    ofType(ContestActions.Types.GetContest),
    flatMap((action: ContestActions.GetContest) => [
      new ContestActions.SetFetching(true),
      new ContestActions.QueryContest(action.payload),
    ]),
  );

  @Effect()
  queryContest$ = this.actions$.pipe(
    ofType(ContestActions.Types.QueryContest),
    switchMap((action: ContestActions.QueryContest) =>
      this.contestService.getContest(action.payload).pipe(
        flatMap(response => [
          new ContestActions.SetFetching(false),
          new ContestActions.SetContestData({
            createdAt: response.data.created_at,
            timeStop: response.data.contest.time_stop,
            virtualDuration: response.data.contest.virtual_duration,
            isVirtual: response.data.contest.is_virtual,
          }),
          new ContestActions.SetStatusCode(response.status_code),
          new ContestActions.SetStatus(response.status),
          new ContestActions.SetContest(formatContest(response.data!.contest.statement as StatementApi, action.payload)),
        ]),
        catchError(response => of(new ContestActions.CatchContestError(response.error))),
      ),
    ),
  );

  @Effect()
  catchContestError$ = this.actions$.pipe(
    ofType(ContestActions.Types.CatchContestError),
    flatMap((action: ContestActions.CatchContestError) => [
      new ContestActions.SetFetching(false),
      new ContestActions.SetStatusCode(action.payload.status_code),
      new ContestActions.SetStatus(action.payload.status),
      new ContestActions.SetError(action.payload.error),
    ]),
  );

  @Effect()
  getProblem$ = this.actions$.pipe(
    ofType(ContestActions.Types.GetProblem),
    flatMap((action: ContestActions.GetProblem) => [
      new ContestActions.SetFetching(true),
      new ContestActions.QueryProblem(action.problemId, action.contestId),
    ]),
  );

  @Effect()
  queryProblem$ = this.actions$.pipe(
    ofType(ContestActions.Types.QueryProblem),
    switchMap((action: ContestActions.QueryProblem) =>
      this.contestService.getProblem(action.problemId, action.contestId).pipe(
        flatMap(response => [
          new ContestActions.SetFetching(false),
          new ContestActions.SetStatusCode(response.status_code),
          new ContestActions.SetStatus(response.status),
          new ContestActions.SetProblem(formatProblem(response.data as ProblemApi)),
        ]),
        catchError(response => of(new ContestActions.CatchContestError(response.error))),
      ),
    ),
  );

  @Effect()
  getSubmissions$ = this.actions$.pipe(
    ofType(ContestActions.Types.GetSubmissions),
    flatMap((action: ContestActions.GetSubmissions) => [
      new ContestActions.SetIsSubmissionFetching(true),
      new ContestActions.QuerySubmissions(action.problemId, action.page, action.contestId),
    ]),
  );

  @Effect()
  querySubmissions$ = this.actions$.pipe(
    ofType(ContestActions.Types.QuerySubmissions),
    switchMap((action: ContestActions.QuerySubmissions) =>
      this.contestService.getSubmissions(action.problemId, action.page, action.contestId).pipe(
        flatMap(response => [
          new ContestActions.SetIsSubmissionFetching(false),
          new ContestActions.SetStatusCode(response.status_code),
          new ContestActions.SetStatus(response.status),
          new ContestActions.SetSubmissions(action.page === 1
            ? (response.data as SubmissionApi[]).map(formatSubmission)
            : [
              ...(response.data as SubmissionApi[]).map(formatSubmission),
            ]),
        ]),
        catchError(response => of(new ContestActions.CatchContestError(response.error))),
      ),
    ),
  );

  constructor(private actions$: Actions,
              private contestService: ContestService) {}
}

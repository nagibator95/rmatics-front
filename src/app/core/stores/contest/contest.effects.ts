import {Injectable} from '@angular/core';
import {ofType, Actions, Effect} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, flatMap, map, switchMap, tap} from 'rxjs/operators';

import {IStatementApi} from '../../../shared/types/contest.types';

import * as ContestActions from './contest.actions';
import {ContestService} from './services/contest.service';
import {SubmissionService} from './services/submission.service';
import {
    IProblemApi,
    IRunCommentApi,
    IRunProtocolApi,
    IRunSourceApi,
    ISubmissionApi,
} from './types/contest.types';
import {
    formatComment,
    formatContest,
    formatProblem,
    formatProtocol,
    formatSource,
    formatSubmission,
} from './util/util';
import {AlertService} from '../../../shared/services/alert.service';
import {MessageComponent} from '../../../ui/message/message.component';

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
                        workshopId: response.data.contest.workshop_id,
                        languages: response.data.contest.languages,
                    }),
                    new ContestActions.SetStatusCode(response.status_code),
                    new ContestActions.SetStatus(response.status),
                    new ContestActions.SetContest(
                        formatContest(
                            response.data!.contest.statement as IStatementApi,
                            action.payload,
                        ),
                    ),
                ]),
                catchError(response =>
                    of(new ContestActions.CatchContestError(response.error)),
                ),
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
            new ContestActions.ShowNotification(
                action.toShow,
                'error',
                action.payload.error,
            ),
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
                    new ContestActions.SetProblem(
                        formatProblem(response.data as IProblemApi),
                    ),
                ]),
                catchError(response =>
                    of(new ContestActions.CatchContestError(response.error, true)),
                ),
            ),
        ),
    );

    @Effect()
    getSubmissions$ = this.actions$.pipe(
        ofType(ContestActions.Types.GetSubmissions),
        flatMap((action: ContestActions.GetSubmissions) => [
            new ContestActions.SetIsSubmissionFetching(true),
            new ContestActions.QuerySubmissions(
                action.problemId,
                action.page,
                action.contestId,
            ),
        ]),
    );

    @Effect()
    querySubmissions$ = this.actions$.pipe(
        ofType(ContestActions.Types.QuerySubmissions),
        switchMap((action: ContestActions.QuerySubmissions) =>
            this.contestService
                .getSubmissions(action.problemId, action.page, action.contestId)
                .pipe(
                    flatMap(response => [
                        new ContestActions.SetIsSubmissionFetching(false),
                        new ContestActions.SetStatusCode(response.status_code),
                        new ContestActions.SetStatus(response.status),
                        new ContestActions.SetSubmissions(
                            (response.data as ISubmissionApi[]).map(formatSubmission),
                            action.page,
                        ),
                    ]),
                    catchError(response =>
                        of(new ContestActions.CatchContestError(response.error, true)),
                    ),
                ),
        ),
    );

    @Effect()
    addSubmission$ = this.actions$.pipe(
        ofType(ContestActions.Types.AddSubmission),
        flatMap((action: ContestActions.AddSubmission) => [
            new ContestActions.SetIsSubmissionFetching(true),
            new ContestActions.QueryAddSubmission(
                action.problemId,
                action.file,
                action.languageId,
                action.contestId,
            ),
        ]),
    );

    @Effect()
    queryAddSubmissions$ = this.actions$.pipe(
        ofType(ContestActions.Types.QueryAddSubmission),
        switchMap((action: ContestActions.QueryAddSubmission) =>
            this.contestService
                .addSubmission(
                    action.problemId,
                    action.file,
                    action.languageId,
                    action.contestId,
                )
                .pipe(
                    flatMap(response => [
                        new ContestActions.SetSubmissions([], 1),
                        new ContestActions.SetStatusCode(response.status_code),
                        new ContestActions.SetStatus(response.status),
                        new ContestActions.GetSubmissions(
                            action.problemId,
                            1,
                            action.contestId,
                        ),
                    ]),
                    catchError(response =>
                        of(new ContestActions.CatchAddSubmissionError(response.error)),
                    ),
                ),
        ),
    );

    @Effect()
    catchAddSubmissionError$ = this.actions$.pipe(
        ofType(ContestActions.Types.CatchAddSubmissionError),
        flatMap((action: ContestActions.CatchAddSubmissionError) => [
            new ContestActions.SetIsSubmissionFetching(false),
            new ContestActions.SetStatusCode(action.payload.status_code),
            new ContestActions.SetStatus(action.payload.status),
            new ContestActions.SetFileError(action.payload.error),
            new ContestActions.ShowNotification(true, 'error', action.payload.error),
        ]),
    );

    @Effect()
    getSubmissionProtocol$ = this.actions$.pipe(
        ofType(ContestActions.Types.GetSubmissionProtocol),
        flatMap((action: ContestActions.GetSubmissionProtocol) => [
            new ContestActions.SetSpecificSubmissionFetching('protocol', true),
            new ContestActions.QuerySubmissionProtocol(action.payload),
        ]),
    );

    @Effect()
    querySubmissionProtocol$ = this.actions$.pipe(
        ofType(ContestActions.Types.QuerySubmissionProtocol),
        switchMap((action: ContestActions.QuerySubmissionProtocol) =>
            this.submissionService.getSubmissionProtocol(action.payload).pipe(
                map(
                    response =>
                        new ContestActions.SetSpecificSubmissionPart('protocol', {
                            isFetching: false,
                            statusCode: response.status_code,
                            status: response.status,
                            data: formatProtocol(response.data as IRunProtocolApi),
                        }),
                ),
                catchError(response =>
                    of(
                        new ContestActions.SetSpecificSubmissionPart('protocol', {
                            isFetching: false,
                            statusCode: response.error.status_code,
                            status: response.error.status,
                            error: response.error.error,
                        }),
                    ),
                ),
            ),
        ),
    );

    @Effect()
    getSubmissionSource$ = this.actions$.pipe(
        ofType(ContestActions.Types.GetSubmissionSource),
        flatMap((action: ContestActions.GetSubmissionSource) => [
            new ContestActions.SetSpecificSubmissionFetching('source', true),
            new ContestActions.QuerySubmissionSource(action.payload),
        ]),
    );

    @Effect()
    querySubmissionSource$ = this.actions$.pipe(
        ofType(ContestActions.Types.QuerySubmissionSource),
        switchMap((action: ContestActions.QuerySubmissionSource) =>
            this.submissionService.getSubmissionSource(action.payload).pipe(
                map(
                    response =>
                        new ContestActions.SetSpecificSubmissionPart('source', {
                            isFetching: false,
                            statusCode: response.status_code,
                            status: response.status,
                            data: formatSource(response.data as IRunSourceApi),
                        }),
                ),
                catchError(response => of(new ContestActions.CatchSourceError(response))),
            ),
        ),
    );

    @Effect()
    getSubmissionComments$ = this.actions$.pipe(
        ofType(ContestActions.Types.GetSubmissionComments),
        flatMap((action: ContestActions.GetSubmissionComments) => [
            new ContestActions.SetSpecificSubmissionFetching('comments', true),
            new ContestActions.QuerySubmissionComments(action.payload),
        ]),
    );

    @Effect()
    querySubmissionComments$ = this.actions$.pipe(
        ofType(ContestActions.Types.QuerySubmissionComments),
        switchMap((action: ContestActions.QuerySubmissionComments) =>
            this.submissionService.getSubmissionComments(action.payload).pipe(
                map(
                    response =>
                        new ContestActions.SetSpecificSubmissionPart('comments', {
                            isFetching: false,
                            statusCode: response.status_code,
                            status: response.status,
                            data: (response.data as IRunCommentApi[]).map(formatComment),
                        }),
                ),
                catchError(response =>
                    of(
                        new ContestActions.SetSpecificSubmissionPart('comments', {
                            isFetching: false,
                            statusCode: response.error.status_code,
                            status: response.error.status,
                            error: response.error.error,
                        }),
                    ),
                ),
            ),
        ),
    );

    @Effect()
    catchSourceError$ = this.actions$.pipe(
        ofType(ContestActions.Types.CatchSourceError),
        flatMap((action: ContestActions.CatchSourceError) => [
            new ContestActions.SetSpecificSubmissionPart('source', {
                isFetching: false,
                statusCode: action.response.error.status_code,
                status: action.response.error.status,
                error: action.response.error.error,
            }),
            new ContestActions.ShowNotification(
                true,
                'error',
                action.response.error.error,
            ),
        ]),
    );

    @Effect()
    showSubmission$ = this.actions$.pipe(
        ofType(ContestActions.Types.ShowSubmission),
        flatMap((action: ContestActions.ShowSubmission) => [
            new ContestActions.SetSubmissionPreview(action.payload.runId),
            new ContestActions.GetSubmissionProtocol(action.payload),
            new ContestActions.GetSubmissionSource(action.payload.runId),
            new ContestActions.GetSubmissionComments(action.payload.runId),
            new ContestActions.ShowModal(),
        ]),
    );

    @Effect({dispatch: false})
    showModal$ = this.actions$.pipe(
        ofType(ContestActions.Types.ShowModal),
        tap(() => this.submissionService.showSubmission()),
    );

    @Effect({dispatch: false})
    showNotification$ = this.actions$.pipe(
        ofType(ContestActions.Types.ShowNotification),
        tap((action: ContestActions.ShowNotification) => {
            if (action.toShow) {
                this.alertService.showNotification(MessageComponent, {
                    status: action.status,
                    text: action.text,
                });
            }
        }),
    );

    constructor(
        private actions$: Actions,
        private contestService: ContestService,
        private submissionService: SubmissionService,
        private alertService: AlertService,
    ) {}
}

import {Action} from '@ngrx/store';

import {IContestData, ISpecificSubmissionState} from './models/models';
import {
    IContest,
    IShowSubmission,
    IProblem,
    IRunComment,
    IRunProtocol,
    IRunSource,
    ISubmission,
} from './types/contest.types';

export enum Types {
    SetFetching = '[Contest] SetFetching',
    GetContest = '[Contest] GetContest',
    QueryContest = '[Contest] QueryContest',
    SetContestData = '[Contest] SetContestData',
    SetStatus = '[Contest] SetStatus',
    SetStatusCode = '[Contest] SetStatusCode',
    SetError = '[Contest] SetError',
    SetContest = '[Contest] SetContest',
    CatchContestError = '[Contest] CatchContestError',
    GetProblem = '[Contest] GetProblem',
    QueryProblem = '[Contest] QueryProblem',
    SetProblem = '[Contest] SetProblem',
    SetIsSubmissionFetching = '[Contest] SetIsSubmissionFetching',
    GetSubmissions = '[Contest] GetSubmissions',
    QuerySubmissions = '[Contest] QuerySubmissions',
    SetSubmissions = '[Contest] SetSubmissions',
    AddSubmission = '[Contest] AddSubmission',
    QueryAddSubmission = '[Contest] QueryAddSubmission',
    CatchAddSubmissionError = '[Contest] CatchAddSubmissionError',
    SetFileError = '[Contest] SetFileError',
    GetSubmissionProtocol = '[Contest] GetSubmissionProtocol',
    QuerySubmissionProtocol = '[Contest] QuerySubmissionProtocol',
    GetSubmissionSource = '[Contest] GetSubmissionSource',
    QuerySubmissionSource = '[Contest] QuerySubmissionSource',
    GetSubmissionComments = '[Contest] GetSubmissionComments',
    QuerySubmissionComments = '[Contest] QuerySubmissionComments',
    SetSpecificSubmissionFetching = '[Contest] SetSpecificSubmissionFetching',
    SetSpecificSubmissionPart = '[Contest] SetSpecificSubmissionPart',
    ShowSubmission = '[Contest] ShowSubmission',
    ShowModal = '[Contest] ShowModal',
    SetSubmissionPreview = '[Contest] SetSubmissionPreview',
    ClearFileError = '[Contest] ClearFileError',
    ShowNotification = '[Contest] ShowNotification',
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

    constructor(public payload: IContestData) {}
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

    constructor(public payload: IContest) {}
}

export class CatchContestError implements Action {
    readonly type = Types.CatchContestError;

    constructor(
        public payload: {error: string; status: string; status_code: number},
        public toShow?: boolean = false,
    ) {}
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

    constructor(public payload: IProblem) {}
}

export class SetIsSubmissionFetching implements Action {
    readonly type = Types.SetIsSubmissionFetching;

    constructor(public payload: boolean) {}
}

export class GetSubmissions implements Action {
    readonly type = Types.GetSubmissions;

    constructor(
        public problemId: number,
        public page: number,
        public contestId: number,
    ) {}
}

export class QuerySubmissions implements Action {
    readonly type = Types.QuerySubmissions;

    constructor(
        public problemId: number,
        public page: number,
        public contestId: number,
    ) {}
}

export class SetSubmissions implements Action {
    readonly type = Types.SetSubmissions;

    constructor(public submissions: ISubmission[], public page: number) {}
}

export class AddSubmission implements Action {
    readonly type = Types.AddSubmission;

    constructor(
        public problemId: number,
        public file: File,
        public languageId: number,
        public contestId: number,
    ) {}
}

export class QueryAddSubmission implements Action {
    readonly type = Types.QueryAddSubmission;

    constructor(
        public problemId: number,
        public file: File,
        public languageId: number,
        public contestId: number,
    ) {}
}

export class CatchAddSubmissionError implements Action {
    readonly type = Types.CatchAddSubmissionError;

    constructor(public payload: {error: string; status: string; status_code: number}) {}
}

export class SetFileError implements Action {
    readonly type = Types.SetFileError;

    constructor(public payload: string | undefined) {}
}

export class GetSubmissionProtocol implements Action {
    readonly type = Types.GetSubmissionProtocol;

    constructor(public payload: IShowSubmission) {}
}

export class QuerySubmissionProtocol implements Action {
    readonly type = Types.QuerySubmissionProtocol;

    constructor(public payload: IShowSubmission) {}
}

export class GetSubmissionSource implements Action {
    readonly type = Types.GetSubmissionSource;

    constructor(public payload: number) {}
}

export class QuerySubmissionSource implements Action {
    readonly type = Types.QuerySubmissionSource;

    constructor(public payload: number) {}
}

export class GetSubmissionComments implements Action {
    readonly type = Types.GetSubmissionComments;

    constructor(public payload: number) {}
}

export class QuerySubmissionComments implements Action {
    readonly type = Types.QuerySubmissionComments;

    constructor(public payload: number) {}
}

export class SetSpecificSubmissionFetching implements Action {
    readonly type = Types.SetSpecificSubmissionFetching;

    constructor(public specifity: string, public isFetching: boolean) {}
}

export class SetSpecificSubmissionPart implements Action {
    readonly type = Types.SetSpecificSubmissionPart;

    constructor(
        public specifity: string,
        public part: ISpecificSubmissionState<IRunProtocol | IRunSource | IRunComment[]>,
    ) {}
}

export class ShowSubmission implements Action {
    readonly type = Types.ShowSubmission;

    constructor(public payload: IShowSubmission) {}
}

export class ShowModal implements Action {
    readonly type = Types.ShowModal;
}

export class SetSubmissionPreview implements Action {
    readonly type = Types.SetSubmissionPreview;

    constructor(public payload: number) {}
}

export class ClearFileError implements Action {
    readonly type = Types.ClearFileError;
}

export class ShowNotification implements Action {
    readonly type = Types.ShowNotification;

    constructor(public toShow: boolean, public status: string, public text: string) {}
}

export type All =
    | SetFetching
    | GetContest
    | QueryContest
    | SetContestData
    | SetStatus
    | SetStatusCode
    | SetError
    | SetContest
    | CatchContestError
    | GetProblem
    | QueryProblem
    | SetProblem
    | SetIsSubmissionFetching
    | GetSubmissions
    | QuerySubmissions
    | SetSubmissions
    | AddSubmission
    | QueryAddSubmission
    | CatchAddSubmissionError
    | SetFileError
    | GetSubmissionProtocol
    | QuerySubmissionProtocol
    | GetSubmissionSource
    | QuerySubmissionSource
    | GetSubmissionComments
    | QuerySubmissionComments
    | SetSpecificSubmissionFetching
    | SetSpecificSubmissionPart
    | ShowSubmission
    | ShowModal
    | SetSubmissionPreview
    | ClearFileError
    | ShowNotification;

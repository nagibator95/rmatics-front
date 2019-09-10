import {IRunComment, IRunProtocol, IRunSource} from '../types/contest.types';
import {ILanguage} from '../../../../shared/constants';
import {IContest, IProblem, ISubmission} from '../types/contest.types';

export interface IContestState {
    contest?: IContest;
    problem?: IProblem;
    submissions: ISubmission[];
    submissionPreview: ISubmission;
    statusCode: number;
    status: string;
    fileError?: string;
    error?: string;
    isFetching: boolean;
    isSubmissionsFetching: boolean;
    contestData: IContestData;
    submissionState: ISubmissionState;
}

export interface IContestData {
    createdAt: string;
    timeStop: string;
    virtualDuration: number;
    isVirtual: boolean;
    workshopId: number;
    languages: ILanguage[];
}

export interface ISubmissionState {
    protocol: ISpecificSubmissionState<IRunProtocol>;
    source: ISpecificSubmissionState<IRunSource>;
    comments: ISpecificSubmissionState<IRunComment[]>;
    [key: string]: any;
}

export interface ISpecificSubmissionState<T> {
    data?: T;
    statusCode: number;
    status: string;
    error?: string;
    isFetching: boolean;
}

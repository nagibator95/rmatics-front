import {IContestApi} from '../../../shared/types/contest.types';

export enum TableType {
    LightACM = 'LightACM',
    ACM = 'ACM',
    IOI = 'IOI',
}

export interface IMonitorUserApi {
    id: 0;
    firstname: string;
    lastname: string;
    school?: string;
    city?: string;
}

interface IMonitorResultApi {
    on_testing: boolean;
    is_ignored: boolean;
    mark: string;
    time: number;
    success: boolean;
    wrong_tries: number;
}

export interface IMonitorResultsApi {
    contest_id: number;
    results: {
        [user_id: number]: {
            [problem_id: number]: IMonitorResultApi | null;
        };
    };
}

export interface IMonitorApi {
    type: TableType;
    contests: IContestApi[];
    users: IMonitorUserApi[];
    results: IMonitorResultsApi[];
}

export interface ITableProblem {
    contestId: number;
    id: number;
    name: string;
    detailed: {
        fullname: string;
        contestName: string;
        summary: string;
    };
}

export interface ITableUserResult {
    onTesting: boolean;
    isIgnored: boolean;
    mark: string;
    time: number;
    success: boolean;
    wrongTries: number;
    isBestResult: boolean;
}

export interface ITableUser {
    id: number;
    firstname: string;
    lastname: string;
    results: Array<ITableUserResult | null>;
    totalScore: number;
    totalTime: number;
    totalTries: number;
    penalty: number;
    rating?: number;
    school?: string;
    city?: string;
}

export interface ITableMonitor {
    type: TableType;
    problems: ITableProblem[];
    users: ITableUser[];
}

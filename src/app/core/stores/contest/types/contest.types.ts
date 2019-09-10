import {IContestApi} from 'src/app/shared/types/contest.types';

import {ILanguage} from '../../../../shared/constants';

export type PackageStatus =
    | 'OK'
    | 'RJ'
    | 'AC'
    | 'SV'
    | 'IG'
    | 'CE'
    | 'DQ'
    | 'PT'
    | 'PD'
    | 'RE'
    | 'TL'
    | 'PE'
    | 'WA'
    | 'CF'
    | 'ML'
    | 'SE'
    | 'RU'
    | 'CG'
    | 'AW'
    | 'RP';

export enum PackageStatusEnum {
    'OK' = 0,
    'RJ' = 99,
    'AC' = 8,
    'SV' = 14,
    'IG' = 9,
    'CE' = 1,
    'DQ' = 10,
    'PT' = 7,
    'PD' = 11,
    'RE' = 2,
    'TL' = 3,
    'PE' = 4,
    'WA' = 5,
    'CF' = 6,
    'ML' = 12,
    'SE' = 13,
    'RU' = 96,
    'CG' = 98,
    'AW' = 377,
    'RP' = 502,
}

export interface IContestConnectionApi {
    id: number;
    created_at: string;
    contest: IContestApi;
}

export interface ISubmissionApi {
    id: number;
    user: {
        id: number;
        firstname: string;
        lastname: string;
    };
    problem: {
        id: number;
        name: string;
    };
    ejudge_status: number;
    create_time: number;
    ejudge_language_id: number;
    ejudge_test_num: number;
    ejudge_score: number;
}

export interface IRunSourceApi {
    language_id: number;
    source: string;
}

export interface IRunTestApi {
    status: string;
    time: number;
    real_time: number;
    max_memory_used: string;
    string_status: string;
}

export interface IRunProtocolApi {
    compiler_output: string;
    host: string;
    tests: {
        [index: number]: IRunTestApi;
    };
}

export interface IRunCommentApi {
    author_user: {
        firstname: string;
        id: number;
        lastname: string;
        username: string;
    };
    comment: string;
    date: string;
    id: number;
    run_id: number;
    user_id: number;
}

export interface IContest {
    id: number;
    name: string;
    summary: string;
    problems: IContestProblem[];
}

export interface IContestProblem {
    letter: string;
    name: string;
    id: number;
    rank: number;
    href: string;
}

export interface ISubmission {
    id: number;
    index: number;
    userName: string;
    date: number;
    lang: ILanguage;
    tests: number;
    score: number;
    status: PackageStatus;
}

export interface IRunTest {
    id: number;
    status: string;
    time: number;
    realTime: number;
    memory: string;
}

export interface IRunProtocol {
    compilerOutput: string;
    host: string;
    tests: IRunTest[];
}

export interface IRunSource {
    language: ILanguage;
    code: string;
}

export interface IRunComment {
    author: {
        firstname: string;
        id: number;
        lastname: string;
        username: string;
    };
    comment: string;
    date: string;
    id: number;
    runId: number;
    userId: number;
}

export interface ISampleTestApi {
    input: string;
    correct: string;
}

export interface IProblemApi {
    id: number;
    name: string;
    content: string;
    timelimit: number;
    memorylimit: number;
    description: string;
    sample_tests_json: {
        [key: string]: ISampleTestApi;
    };
    output_only: boolean;
}

export interface IProblem {
    id: number;
    name: string;
    content: string;
    timeLimit: number;
    memoryLimit: number;
    description: string;
    input: string[];
    correct: string[];
    outputOnly: boolean;
}

export interface ITest {
    id: number;
    status: PackageStatus;
    score?: number;
    time: number;
    realTime: number;
    memory: number;
}

export interface IShowSubmission {
    contestId: number;
    problemId: number;
    runId: number;
}

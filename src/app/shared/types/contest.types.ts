import {ILanguage} from '../constants';

export interface IContestApi {
    id: number;
    workshop_id: number;
    position: number;
    time_start: string;
    time_stop: string;
    is_virtual: boolean;
    virtual_duration: number;
    languages: ILanguage[];
    statement: IStatementApi;
}

export interface IStatementApi {
    id: number;
    name: string;
    summary: string;
    problems: IContestProblemApi[];
}

export interface IContestProblemApi {
    id: number;
    name: string;
    rank: number;
}

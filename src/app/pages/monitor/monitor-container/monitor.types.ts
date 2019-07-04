import { ContestApi} from '../../../shared/types/contest.types';

export enum TableType {
  LightACM = 'LightACM',
  ACM = 'ACM',
  IOI = 'IOI',
}

export interface MonitorUserApi {
  id: 0,
  firstname: string,
  lastname: string,
  school?: string,
  city?: string,
}

interface MonitorResultApi {
  on_testing: boolean,
  is_ignored: boolean,
  mark: string,
  time: number,
  success: boolean,
  wrong_tries: number,
}

export interface MonitorResultsApi {
  contest_id: number,
  results: {
    [user_id: number]: {
      [problem_id: number]: MonitorResultApi | null,
    }
  }
}

export interface MonitorApi {
  type: TableType,
  contests: ContestApi[],
  users: MonitorUserApi[],
  results: MonitorResultsApi[],
}

export interface TableProblem {
  contestId: number,
  id: number,
  name: string,
  detailed: {
    fullname: string,
    contestName: string,
    summary: string,
  }
}

export interface TableUserResult {
  onTesting: boolean,
  isIgnored: boolean,
  mark: string,
  time: number,
  success: boolean,
  wrongTries: number,
  isBestResult: boolean,
}

export interface TableUser {
  id: number,
  firstname: string,
  lastname: string,
  results: Array<TableUserResult | null>,
  totalScore: number,
  totalTime: number,
  totalTries: number,
  penalty: number,
  rating?: number,
  school?: string,
  city?: string,
}

export interface TableMonitor {
  type: TableType,
  problems: TableProblem[],
  users: TableUser[],
}

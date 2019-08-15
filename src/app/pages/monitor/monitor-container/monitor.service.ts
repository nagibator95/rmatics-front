import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse } from 'src/app/core/stores/auth/models/apiResponse.model';
import { ContestApi } from 'src/app/shared/types/contest.types';
import { Store } from 'src/app/utils/Store';
import { environment } from 'src/environments/environment';

import {formatLetter} from '../../../core/stores/contest/util/util';

import {
  MonitorApi,
  MonitorResultsApi,
  TableMonitor,
  TableProblem,
  TableType,
  TableUser,
  TableUserResult,
} from './monitor.types';
import { totalScoreCompare } from './table-sort';

interface MonitorState {
  statusCode: number;
  status: string;
  error?: string;
  isFetching: boolean;
  monitor?: TableMonitor | null;
  data?: MonitorApi | null;
}

interface BestResults {
  [problemId: number]: number,
}

const initialState: MonitorState = {
  statusCode: 200,
  status: 'success',
  error: '',
  isFetching: false,
};

const PENALTY_TIME = 1200000;

const memoContest = () => {
  let contests: { [id: number]: MonitorResultsApi } = {};
  
  return (results: MonitorResultsApi[], id: number) => {
    if (id in contests) {
      return contests[id].results;
    }
    const currentContest = results.find(contest => contest.contest_id === id);
    if (!currentContest) return;
    contests[id] = currentContest;
    return currentContest.results;
  }
}

const formatProblems = (contests: ContestApi[]): TableProblem[] =>
  contests.sort((contest1, contest2) => contest1.position - contest2.position).reduce((memo: TableProblem[], contest) => {
    contest.statement.problems.forEach((problem, index: number) => {
      memo.push({
        contestId: contest.id,
        id: problem.id,
        name: `${contest.position + 1}${formatLetter(index)}`,
        detailed: {
          fullname: `Задача №${problem.id}. ${problem.name}`,
          contestName: contest.statement.name,
          summary: contest.statement.summary,
        },
      });
    });
    return memo;
  }, []);

export const formatUsers = ({ users, results, type }: MonitorApi, problems: TableProblem[]): TableUser[] => {
  const getContestResults = memoContest();

  const bestResults: BestResults = problems.reduce((memo, problem) => {
    users.forEach(user => {
      const contestResults = getContestResults(results, problem.contestId);
      if (!contestResults) return;
      const { [user.id]: { [problem.id]: userResult } = {} } = contestResults;
      if (!userResult) return;

      const previousUser = memo[problem.id];
      const previousUserResult = previousUser ? contestResults[previousUser][problem.id] : null;
      const isComplete = type === TableType.IOI ? Number(userResult.mark) === 100 && userResult.success : userResult.success;

      if (
        isComplete && (
          !previousUser ||
          previousUserResult && userResult.time < previousUserResult.time
        )
      ) {
        memo[problem.id] = user.id
      }
    });

    return memo;
  }, {} as BestResults);

  return users
    .map(user => {
      let totalScore = 0;
      let totalTime = 0;
      let totalTries = 0;
      let penalty = 0;

      const userResults: Array<TableUserResult | null> = problems.map(problem => {
        const contestResults = getContestResults(results, problem.contestId);
        if (!contestResults) return null;
        const { [user.id]: { [problem.id]: result } = {} } = contestResults;
        if (!result) return null;

        totalScore = totalScore + Number(type === TableType.IOI ? result.mark : result.success);
        totalTime = totalTime + result.time;
        totalTries = totalTries + result.wrong_tries;

        if (type === TableType.ACM && result.success) {
          penalty = penalty + result.time + result.wrong_tries * PENALTY_TIME
        }

        return {
          time: result.time,
          wrongTries: result.wrong_tries,
          success: result.success,
          onTesting: result.on_testing,
          isIgnored: result.is_ignored,
          mark: result.mark,
          isBestResult: bestResults[problem.id] === user.id,
        }
      });

      return {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        results: userResults,
        totalScore,
        totalTime,
        totalTries,
        penalty,
        school: user.school,
        city: user.city,
      }
    })
    .sort(totalScoreCompare(type))
    .map((user, index) => ({ ...user, rating: index + 1}))
}

const formatMonitor = (data: MonitorApi): TableMonitor => {
  const problems = formatProblems(data.contests);

  const users = formatUsers(data, problems);

  return { problems, users, type: data.type };
};

@Injectable({
  providedIn: 'root'
})
export class MonitorService {
  private store = new Store<MonitorState>(initialState);
  monitor = this.store.state.pipe(map(state => state.monitor));
  data = this.store.state.pipe(map(state => state.data));
  isFetching = this.store.state.pipe(map(state => state.isFetching));

  constructor(private http: HttpClient) {
  }

  getMonitor(workshopId: number) {
    this.setFetching(true);

    const nextState = this.http.get<ApiResponse<MonitorApi>>(environment.apiUrl
      + `/workshop/${workshopId}/monitor`,
    ).pipe(
        map(response => ({
          ...this.store.getState(),
          isFetching: false,
          statusCode: response.status_code,
          status: response.status,
          monitor: response.data ? formatMonitor(response.data) : null,
          data: response.data || null,
        })),
        catchError((err) => {
          const {error = {}} = err;
          return of({
            ...this.store.getState(),
            statusCode: error.status_code,
            status: error.status,
            error: error.error,
          })
        }),
      );

    this.store.setState(nextState);
  }

  setFetching(isFetching: boolean) {
    this.store.setState(of({
      ...this.store.getState(),
      isFetching: isFetching,
    }));
  }

  setMonitor(monitor: TableMonitor | null) {
    this.store.setState(of({
      ...this.store.getState(),
      monitor: monitor,
    }));
  }
}

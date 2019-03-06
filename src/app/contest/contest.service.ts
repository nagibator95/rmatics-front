import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { languages } from '../shared/constants';
import { ApiResponse } from '../utils/types';
import { Store } from '../utils/Store';

import {
  Contest,
  ContestApi,
  PackageStatus,
  PackageStatusEnum,
  Problem,
  ProblemApi,
  Submission,
  SubmissionApi,
} from './contest.types';

interface ContestState {
  contest?: Contest;
  problem?: Problem;
  submissions: Submission[];
  statusCode: number;
  status: string;
  error?: string;
  isFetching: boolean;
  isSubmissionsFetching: boolean;
}

const initialState: ContestState = {
  contest: undefined,
  problem: undefined,
  submissions: [],
  statusCode: 200,
  status: 'success',
  error: '',
  isFetching: false,
  isSubmissionsFetching: false,
};

export const formatContest = (contest: ContestApi) => ({
  id: contest.id,
  name: contest.name,
  summary: contest.summary,
  problems: contest.problems.map(item => ({
    letter: 'abcdefghijklmnopqrstuvwxyz'[item.rank - 1],
    name: item.name,
    id: item.id,
    rank: item.rank,
    href: `/contest/task/${item.id}`,
  })),
});

export const formatProblem = (problem: ProblemApi) => ({
  id: problem.id,
  name: problem.name,
  content: problem.content,
  timeLimit: problem.timelimit,
  memoryLimit: problem.memorylimit,
  description: problem.description,
  input: problem.sample_tests_json ? JSON.parse(problem.sample_tests_json.input) : '',
  correct: problem.sample_tests_json ? JSON.parse(problem.sample_tests_json.correct) : '',
  outputOnly: problem.output_only,
});

@Injectable({
  providedIn: 'root',
})

export class ContestService {
  private store = new Store<ContestState>(initialState);
  isFetching = this.store.state.pipe(map(state => state.isFetching));
  isSubmissionsFetching = this.store.state.pipe(map(state => state.isSubmissionsFetching));
  contest = this.store.state.pipe(map(state => state.contest));
  problem = this.store.state.pipe(map(state => state.problem));
  submissions = this.store.state.pipe(map(state => state.submissions));

  constructor(private http: HttpClient) {
  }

  addSubmission(problemId: number, solution: string, languageId: number, contestId: number) {
    this.http.post<ApiResponse<any>>(environment.apiUrl + `/contest/problem/${problemId}/submission`, {
      lang_id: languageId,
      statement_id: contestId,
      file: btoa(solution),
    }).subscribe();
  }

  getSubmissions(problemId: number, count: number) {
    this.store.setState(of({
      ...this.store.getState(),
      isSubmissionsFetching: true,
    }));

    const nextState = this.http.get<ApiResponse<SubmissionApi[]>>(environment.apiUrl + `/contest/problem/${problemId}/submission?page=0&count=${count}`)
      .pipe(map(response => ({
        ...this.store.getState(),
        isFetching: false,
        statusCode: response.status_code,
        status: response.status,
        error: response.error,
        isSubmissionsFetching: false,
        submissions: (response.data as SubmissionApi[]).map(item => {
          const lang = languages.find(language => language.id === item.ejudge_language_id);

        return {
          id: item.id,
          date: item.create_time,
          lang: lang ? lang : languages[0],
          tests: item.ejudge_test_num,
          score: item.ejudge_score,
          href: '',
          status: PackageStatusEnum[item.ejudge_status] as PackageStatus,
        };
      }),
    })));

    this.store.setState(nextState);
  }

  getContest(contestId: number) {
    const nextState = this.http.get<ApiResponse<ContestApi>>(environment.apiUrl + `/contest/${contestId}`)
      .pipe(map(response => ({
        ...this.store.getState(),
        statusCode: response.status_code,
        status: response.status,
        error: response.error,
        contest: formatContest(response.data as ContestApi),
      })));

    this.store.setState(nextState);
  }

  getProblem(problemId: number) {
    this.store.setState(of({
      ...this.store.getState(),
      isFetching: true,
    }));

    const nextState = this.http.get<ApiResponse<ProblemApi>>(environment.apiUrl + `/contest/problem/${problemId}`)
      .pipe(map(response => ({
        ...this.store.getState(),
        statusCode: response.status_code,
        status: response.status,
        error: response.error,
        problem: formatProblem(response.data as ProblemApi),
        isFetching: false,
      })));

    this.store.setState(nextState);
  }
}

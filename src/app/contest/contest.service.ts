import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

import { languages } from '../shared/constants';
import { Store } from '../utils/Store';

import { addFakeSubmission, getFakeContest, getFakeProblem, getFakeSubmissions } from './contest.fetcher';
import { Contest, Problem, Submission, SubmissionApi } from './contest.types';
import { PackageStatus } from './sent-packages/package-status/package-status.component';

interface ContestState {
  contest?: Contest;
  problem?: Problem;
  submissions: Submission[];
  statusCode: number;
  status: string;
  error?: string;
  isFetching: boolean;
}

const initialState: ContestState = {
  contest: undefined,
  problem: undefined,
  submissions: [],
  statusCode: 200,
  status: 'success',
  error: '',
  isFetching: false,
};

@Injectable({
  providedIn: 'root',
})
export class ContestService {
  private store = new Store<ContestState>(initialState);
  contest = this.store.state.pipe(map(state => state.contest));
  problem = this.store.state.pipe(map(state => state.problem));
  submissions = this.store.state.pipe(map(state => state.submissions));

  constructor() {
    this.store.state.subscribe(e => console.log(e));
  }

  addSubmission(problemId: number, solution: string, languageId: number) {
    addFakeSubmission(problemId, solution, languageId);
  }

  getSubmissions(problemId: number) {
    const currentState = this.store.getState();

    const nextState = getFakeSubmissions(problemId).pipe(map(response => ({
      ...currentState,
      isFetching: false,
      statusCode: response.status_code,
      status: response.status,
      error: response.error,
      submissions: (response.data as SubmissionApi[]).map(item => {
        const lang = languages.find(language => language.id === item.ejudge_language_id);

        return {
          id: item.id,
          date: item.create_time,
          lang: lang ? lang.title : '',
          tests: item.ejudge_test_num,
          score: item.ejudge_score,
          href: '',
          status: item.ejudge_status as PackageStatus,
        };
      }),
    })));

    this.store.setState(nextState);
  }

  getContest(contestId: number) {
    const currentState = this.store.getState();

    this.store.setState(of({
      ...currentState,
      isFetching: true,
    }));

    const nextState = getFakeContest(contestId).pipe(map(response => ({
      ...currentState,
      isFetching: false,
      statusCode: response.status_code,
      status: response.status,
      error: response.error,
      contest: response.data,
    })));

    this.store.setState(nextState);
  }

  getProblem(problemId: number) {
    const nextState = getFakeProblem(problemId).pipe(map(response => ({
      ...this.store.getState(),
      statusCode: response.status_code,
      status: response.status,
      error: response.error,
      problem: response.data,
    })));

    this.store.setState(nextState);
  }
}

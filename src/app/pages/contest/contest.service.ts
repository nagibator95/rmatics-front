import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { languages } from '../../shared/constants';
import { ApiResponse } from '../../utils/types';
import { Store } from '../../utils/Store';

import {
  Contest,
  ContestConnectionApi,
  PackageStatus,
  PackageStatusEnum,
  Problem,
  ProblemApi,
  StatementApi,
  Submission,
  SubmissionApi,
} from './contest.types';

const defaultCourseId = 1;
const defaultPageSize = 5;

interface ContestState {
  contest?: Contest;
  problem?: Problem;
  submissions: Submission[];
  statusCode: number;
  status: string;
  fileError?: string;
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
  fileError: '',
  error: '',
  isFetching: false,
  isSubmissionsFetching: false,
};

const formatSubmission = (submission: SubmissionApi, index: number) => {
  const lang = languages.find(language => language.id === submission.ejudge_language_id);

  return {
    index: index + 1,
    userName: `${submission.user.firstname} ${submission.user.lastname}`,
    id: submission.id,
    date: submission.create_time,
    lang: lang ? lang : languages[0],
    tests: submission.ejudge_test_num,
    score: submission.ejudge_score,
    href: '',
    status: PackageStatusEnum[submission.ejudge_status] as PackageStatus,
  } as Submission;
};

const formatContest = (contest: StatementApi, courseId: number) => ({
  id: contest.id,
  name: contest.name,
  summary: contest.summary,
  problems: contest.problems.map(item => ({
    letter: 'abcdefghijklmnopqrstuvwxyz'[item.rank - 1],
    name: item.name,
    id: item.id,
    rank: item.rank,
    href: `/contest/${courseId}/problem/${item.id}`,
  })),
});

const formatProblem = (problem: ProblemApi) => ({
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

@Injectable()
export class ContestService {
  private store = new Store<ContestState>(initialState);
  isFetching = this.store.state.pipe(map(state => state.isFetching));
  isSubmissionsFetching = this.store.state.pipe(map(state => state.isSubmissionsFetching));
  contest = this.store.state.pipe(map(state => state.contest));
  problem = this.store.state.pipe(map(state => state.problem));
  submissions = this.store.state.pipe(map(state => state.submissions));
  fileError = this.store.state.pipe(map(state => state.fileError));

  constructor(private http: HttpClient) {
  }

  addSubmission(problemId: number, file: File, languageId: number, contestId: number) {
    const contest = this.store.getState().contest as Contest;
    const formData = new FormData();
    formData.append('lang_id', languageId.toString());
    formData.append('statement_id', contest.id.toString());
    formData.append('file', file, file.name);

    const nextState = this.http.post<ApiResponse<SubmissionApi[]>>(
      environment.apiUrl + `/contest/${contestId}/problem/${problemId}/submission`,
      formData,
    ).pipe(
      map(response => ({
        ...this.store.getState(),
        submissions: [],
        isSubmissionsFetching: true,
        statusCode: response.status_code,
        status: response.status,
      })),
      tap(() => this.getSubmissions(problemId, 1, defaultCourseId)),
      catchError(({ error }) => of({
        ...this.store.getState(),
        statusCode: error.status_code,
        status: error.status,
        fileError: error.error,
      })),
    );

    this.store.setState(nextState);
  }

  getSubmissions(problemId: number, page: number, contestId: number) {
    this.store.setState(of({
      ...this.store.getState(),
      isSubmissionsFetching: true,
    }));

    const nextState = this.http.get<ApiResponse<SubmissionApi[]>>(environment.apiUrl
      + `/contest/${contestId}/problem/${problemId}/submission?count=${defaultPageSize}&page=${page}`,
    ).pipe(
      map(response => ({
        ...this.store.getState(),
        isFetching: false,
        statusCode: response.status_code,
        status: response.status,
        isSubmissionsFetching: false,
        submissions: page === 1
          ? (response.data as SubmissionApi[]).map(formatSubmission)
          : [
            ...this.store.getState().submissions,
            ...(response.data as SubmissionApi[]).map(formatSubmission),
          ],
      })),
      catchError(({ error }) => of({
        ...this.store.getState(),
        statusCode: error.status_code,
        status: error.status,
        error: error.error,
      })),
    );

    this.store.setState(nextState);
  }

  getContest(courseId: number) {
    const nextState = this.http.get<ApiResponse<ContestConnectionApi>>(environment.apiUrl + `/contest/${courseId}`)
      .pipe(
        map(response => {
          const { data: { contest: { statement = { problems: [] } } = {} } = {} } = response;

          return {
            ...this.store.getState(),
            statusCode: response.status_code,
            status: response.status,
            contest: formatContest(response.data!.contest.statement as StatementApi, courseId),
          };
        }),
        catchError(({ error }) => {
          return of({
            ...this.store.getState(),
            statusCode: error.status_code,
            status: error.status,
            error: error.error,
          });
        }),
      );

    this.store.setState(nextState);
  }

  getProblem(problemId: number, contestId: number) {
    this.store.setState(of({
      ...this.store.getState(),
      isFetching: true,
    }));

    const nextState = this.http.get<ApiResponse<ProblemApi>>(environment.apiUrl + `/contest/${contestId}/problem/${problemId}`)
      .pipe(
        map(response => ({
          ...this.store.getState(),
          statusCode: response.status_code,
          status: response.status,
          problem: formatProblem(response.data as ProblemApi),
          isFetching: false,
        })),
        catchError(({ error }) => of({
          ...this.store.getState(),
          statusCode: error.status_code,
          status: error.status,
          error: error.error,
        })),
      );

    this.store.setState(nextState);
  }

  clearFileError() {
    this.store.setState(of({
      ...this.store.getState(),
      fileError: '',
    }));
  }
}

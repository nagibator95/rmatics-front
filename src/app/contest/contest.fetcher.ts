import { interval, Observable } from 'rxjs';

import { fakeHTTPRequest } from '../utils/fakeHTTPRequest';
import { ApiResponse } from '../utils/types';

import { contests, problems, submissions } from './contest.mock';
import { Contest, ContestApi, Problem, ProblemApi, SubmissionApi } from './contest.types';

const statuses = ['OK', 'RJ', 'AC', 'SV', 'IG', 'CE', 'DQ', 'PT', 'PD', 'RT', 'TL', 'PE', 'WA', 'CF', 'ML', 'SE', 'RU', 'CG', 'AW'];

const formatContest = (contest: ContestApi) => ({
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

const formatProblem = (problem: ProblemApi) => ({
  id: problem.id,
  name: problem.name,
  content: problem.content,
  timeLimit: problem.timelimit,
  memoryLimit: problem.memorylimit,
  description: problem.description,
  input: JSON.parse(problem.sample_tests_json.input),
  correct: JSON.parse(problem.sample_tests_json.correct),
  outputOnly: problem.output_only,
});

interval(5000).subscribe(() => {
  submissions.forEach(item => {
    item.ejudge_status = statuses[Math.floor(Math.random() * statuses.length)];
    item.ejudge_score = Math.floor(Math.random() * Math.floor(100));
  });
});

export const getFakeProblem = (problemId: number): Observable<ApiResponse<Problem>> => {
  const problem = problems.find(item => item.id === problemId);
  const response = problem !== undefined
    ? {
      status_code: 200,
      status: 'success',
      data: formatProblem(problem),
    }
    : {
      status_code: 404,
      status: 'error',
      error: 'The specified resource was not found',
    };

  return fakeHTTPRequest(response);
};

export const getFakeContest = (contestId: number): Observable<ApiResponse<Contest>> => {
  const contest = contests.find(item => item.id === contestId);
  const response = contest !== undefined
    ? {
      status_code: 200,
      status: 'success',
      data: formatContest(contest),
    }
    : {
      status_code: 404,
      status: 'error',
      error: 'The specified resource was not found',
    };

  return fakeHTTPRequest(response, 0);
};

export const addFakeSubmission = (problemId: number, _solution: string, languageId: number) => {
  const newSubmission: SubmissionApi = {
    id: submissions.length + 1,
    user: {
      id: 1,
      firstname: 'First',
      lastname: 'Last',
    },
    problem: {
      id: problemId,
      name: '',
    },
    create_time: new Date().getTime(),
    ejudge_status: 'PD',
    ejudge_language_id: languageId,
    ejudge_test_num: 0,
    ejudge_score: 0,
  };

  submissions.push(newSubmission);
};

export const getFakeSubmissions = (problemId: number): Observable<ApiResponse<SubmissionApi[]>> => {
  const filterSubs = submissions.filter(item => item.problem.id === problemId);
  const response = {
    status_code: 200,
      status: 'success',
    data: filterSubs,
  };

  return fakeHTTPRequest(response);
};

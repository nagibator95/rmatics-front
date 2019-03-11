import { Language } from '../shared/constants';

export type PackageStatus =
  'OK' |
  'RJ' |
  'AC' |
  'SV' |
  'IG' |
  'CE' |
  'DQ' |
  'PT' |
  'PD' |
  'RT' |
  'TL' |
  'PE' |
  'WA' |
  'CF' |
  'ML' |
  'SE' |
  'RU' |
  'CG' |
  'AW';

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
  'RT' = 2,
  'TL' = 3,
  'PE' = 4,
  'WA' = 5,
  'CF' = 6,
  'ML' = 12,
  'SE' = 13,
  'RU' = 96,
  'CG' = 98,
  'AW' = 377,
}

export interface ContestApi {
  id: number;
  name: string;
  summary: string;
  problems: ContestProblemApi[];
}

export interface Contest {
  id: number;
  name: string;
  summary: string;
  problems: ContestProblem[];
}

export interface SubmissionApi {
  id: number;
  user: {
    id: number,
    firstname: string,
    lastname: string,
  };
  problem: {
    id: number,
    name: string,
  };
  ejudge_status: number;
  create_time: number;
  ejudge_language_id: number;
  ejudge_test_num: number;
  ejudge_score: number;
}

export interface RunSourceApi {
  language_id: number;
  source: string;
}

export interface RunTestApi {
  status: string;
  time: number;
  real_time: number;
  max_memory_used: string;
  string_status: string;
}

export interface RunProtocolApi {
  compiler_output: string;
  host: string;
  tests: {
    [index: number]: RunTestApi;
  };
}

export interface Submission {
  id: number;
  index: number;
  userName: string;
  date: number;
  lang: Language;
  tests: number;
  score: number;
  status: PackageStatus;
}

export interface RunTest {
  id: number;
  status: string;
  time: number;
  realTime: number;
  memory: string;
}

export interface RunProtocol {
  compilerOutput?: string;
  host?: string;
  tests?: RunTest[];
}

export interface SubmissionDetailed extends Submission {
  source?: string;
  protocol?: RunProtocol;
}

export interface ContestProblemApi {
  id: number;
  name: string;
  rank: number;
}

export interface ContestProblem {
  letter: string;
  name: string;
  id: number;
  rank: number;
}

export interface SampleTestApi {
  input: string;
  correct: string;
}

export interface ProblemApi {
  id: number;
  name: string;
  content: string;
  timelimit: number;
  memorylimit: number;
  description: string;
  sample_tests_json: SampleTestApi;
  output_only: boolean;
}

export interface Problem {
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

export interface Statistics {
  param: string;
  condition?: string;
  value?: string;
  test?: number;
}

export interface Test {
  id: number;
  status: PackageStatus;
  score?: number;
  time: number;
  realTime: number;
  memory: number;
}

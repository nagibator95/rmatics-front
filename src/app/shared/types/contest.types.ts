import {Language} from '../constants';

export interface ContestApi {
  id: number;
  workshop_id: number;
  position: number;
  time_start: string;
  time_stop: string;
  is_virtual: boolean;
  virtual_duration: number;
  languages: Language[];
  statement: StatementApi;
}

export interface StatementApi {
  id: number;
  name: string;
  summary: string;
  problems: ContestProblemApi[];
}

export interface ContestProblemApi {
  id: number;
  name: string;
  rank: number;
}

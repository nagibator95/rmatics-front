import { ContestApi } from '../contest/contest.types';

export interface WorkshopApi {
  id: number;
  name: string;
  visibility: string;
  contests: ContestApi[];
}

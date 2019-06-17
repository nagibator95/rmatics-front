import { ContestApi } from 'src/app/shared/types/contest.types';

export interface WorkshopApi {
  id: number;
  name: string;
  visibility: string;
  contests: ContestApi[];
}

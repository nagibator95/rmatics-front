import {IContestApi} from 'src/app/shared/types/contest.types';

export interface IWorkshopApi {
    id: number;
    name: string;
    visibility: string;
    contests: IContestApi[];
}

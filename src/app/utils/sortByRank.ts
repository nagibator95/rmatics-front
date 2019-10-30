import {IContestProblem} from '../core/stores/contest/types/contest.types';

export function sortByRank(problem1: IContestProblem, problem2: IContestProblem): number {
    return problem1.rank - problem2.rank;
}

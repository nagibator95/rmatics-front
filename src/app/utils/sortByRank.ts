import {ContestProblem} from '../core/stores/contest/types/contest.types';

export function sortByRank(problem1: ContestProblem, problem2: ContestProblem) {
  return problem1.rank - problem2.rank;
}

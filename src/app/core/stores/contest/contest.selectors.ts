import {createFeatureSelector, createSelector} from '@ngrx/store';

import {CONTEST_STORE} from './contest-store.module';
import {ContestState} from './models/models';

export const featureSelector = createFeatureSelector<ContestState>(CONTEST_STORE);

export function getFetching() {
  return createSelector(
    featureSelector,
    state => state.isFetching || null,
  );
}

export function getError() {
  return createSelector(
    featureSelector,
    state => state.error || null,
  );
}

export function getContest() {
  return createSelector(
    featureSelector,
    state => state.contest || null,
  );
}

export function getContestData() {
  return createSelector(
    featureSelector,
    state => state.contestData || null,
  );
}

export function getProblem() {
  return createSelector(
    featureSelector,
    state => state.problem || null,
  );
}

export function getIsSubmissionFetching() {
  return createSelector(
    featureSelector,
    state => state.isSubmissionsFetching || null,
  );
}

import {createFeatureSelector, createSelector} from '@ngrx/store';

import {CONTEST_STORE} from './contest-store.module';
import {ContestState} from './models/models';

export const featureSelector = createFeatureSelector<ContestState>(CONTEST_STORE);

export function getIsFetching() {
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

export function getSubmissions() {
  return createSelector(
    featureSelector,
    state => state.submissions || null,
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

export function getFileError() {
  return createSelector(
    featureSelector,
    state => state.fileError || null,
  );
}

export function getIsProtocolFetching() {
  return createSelector(
    featureSelector,
    state => state.submissionState.protocol.isFetching || null,
  );
}

export function getIsSourceFetching() {
  return createSelector(
    featureSelector,
    state => state.submissionState.source.isFetching || null,
  );
}

export function getAreCommentsFetching() {
  return createSelector(
    featureSelector,
    state => state.submissionState.comments.isFetching || null,
  );
}

export function getProtocol() {
  return createSelector(
    featureSelector,
    state => state.submissionState.protocol || null,
  );
}

export function getSource() {
  return createSelector(
    featureSelector,
    state => state.submissionState.source || null,
  );
}

export function getComments() {
  return createSelector(
    featureSelector,
    state => state.submissionState.comments || null,
  );
}

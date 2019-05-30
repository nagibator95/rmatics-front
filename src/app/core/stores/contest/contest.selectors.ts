import {createFeatureSelector, createSelector} from '@ngrx/store';

import {CONTEST_STORE} from './contest-store.module';
import {ContestState} from './models/models';

const featureSelector = createFeatureSelector<ContestState>(CONTEST_STORE);

export function getFetching() {
  return createSelector(
    featureSelector,
    state => state.isFetching || null,
  );
}

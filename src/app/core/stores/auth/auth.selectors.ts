import {createFeatureSelector, createSelector} from '@ngrx/store';

import {AUTH_STORE} from './auth-store.module';
import {AuthState} from './models/authState.model';

const featureSelector = createFeatureSelector<AuthState>(AUTH_STORE);

export function getError(formName: string) {
  return createSelector(
    featureSelector,
    state => state.error || null,
  );
}

export function getFetching(formName: string) {
  return createSelector(
    featureSelector,
    state => state.isFetching || null,
  );
}

export function getIsLoggedIn(formName: string) {
  return createSelector(
    featureSelector,
    state => state.isLoggedIn || null,
  );
}

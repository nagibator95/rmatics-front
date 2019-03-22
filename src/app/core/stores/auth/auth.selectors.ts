import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';

import {AUTH_STORE} from './auth-store.module';
import {AuthState} from './models/authState.model';

const featureSelector = createFeatureSelector<AuthState>(AUTH_STORE);

export function getError<T>(formName: string): MemoizedSelector<AuthState, T> {
  return createSelector(
    featureSelector,
    state => state.error || null,
  );
}

export function getFetching<T>(formName: string): MemoizedSelector<AuthState, T> {
  return createSelector(
    featureSelector,
    state => state.isFetching || null,
  );
}

export function getIsLoggedIn<T>(formName: string): MemoizedSelector<AuthState, T> {
  return createSelector(
    featureSelector,
    state => state.isLoggedIn || null,
  );
}

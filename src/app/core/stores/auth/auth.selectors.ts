import {createFeatureSelector, createSelector} from '@ngrx/store';

import {AUTH_STORE} from './auth-store.module';
import {AuthState} from './models/authState.model';

const featureSelector = createFeatureSelector<AuthState>(AUTH_STORE);

export function getError() {
  return createSelector(
    featureSelector,
    state => state.error || null,
  );
}

export function getFetching() {
  return createSelector(
    featureSelector,
    state => state.isFetching || null,
  );
}

export function getIsLoggedIn() {
  return createSelector(
    featureSelector,
    state => state.isLoggedIn || null,
  );
}

export function getEmail() {
  return createSelector(
    featureSelector,
    state => state.state ? state.state.email : null,
  );
}

export function getIsPasswordRestoreFinished() {
  return createSelector(
    featureSelector,
    state => state.isPasswordRestoreFinished || null,
  );
}

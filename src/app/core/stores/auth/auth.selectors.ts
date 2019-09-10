import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';

import {AUTH_STORE} from './auth-store.module';
import {IAuthState} from './models/authState.model';

const featureSelector = createFeatureSelector<IAuthState>(AUTH_STORE);

export function getError(): MemoizedSelector<IAuthState, string> {
    return createSelector(
        featureSelector,
        state => state.error || null,
    );
}

export function getFetching(): MemoizedSelector<IAuthState, boolean> {
    return createSelector(
        featureSelector,
        state => state.isFetching || null,
    );
}

export function getIsLoggedIn(): MemoizedSelector<IAuthState, boolean> {
    return createSelector(
        featureSelector,
        state => state.isLoggedIn || null,
    );
}

export function getEmail(): MemoizedSelector<IAuthState, string> {
    return createSelector(
        featureSelector,
        state => (state.state ? state.state.email : null),
    );
}

export function getIsPasswordRestoreFinished(): MemoizedSelector<IAuthState, boolean> {
    return createSelector(
        featureSelector,
        state => state.isPasswordRestoreFinished || null,
    );
}

export function getIsPasswordChangeFinished(): MemoizedSelector<IAuthState, boolean> {
    return createSelector(
        featureSelector,
        state => state.isPasswordChangeFinished || null,
    );
}

export function getRefreshToken(): MemoizedSelector<IAuthState, string> {
    return createSelector(
        featureSelector,
        state => (state.state ? state.state.refreshToken : null),
    );
}

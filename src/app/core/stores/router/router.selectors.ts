import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ROUTER_STORE} from './router-store.module';
import {RouterState} from './router.serializer';

const featureSelector = createFeatureSelector<RouterState>(ROUTER_STORE);

export const getParams = createSelector(
  featureSelector,
  router => (router && router.state ? router.state.params : null)
);

export const getQueryParams = createSelector(
  featureSelector,
  router => (router && router.state ? router.state.queryParams : null)
);

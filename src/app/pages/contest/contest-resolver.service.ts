import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {filter, take, tap} from 'rxjs/operators';

import {AuthSelectors} from '../../core/stores/auth';
import {Contest} from '../../core/stores/contest/types/contest.types';
import {RouterActions} from '../../core/stores/router';
import {Routes} from '../../core/stores/router/enum/routes.enum';

@Injectable()
export class ContestResolverService implements Resolve<Contest> {
  constructor(private router: Router,
              private store$: Store<any>) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Contest> {
    return this.waitForLogin();
  }

  waitForLogin(): Observable<Contest> {
    return this.store$.pipe(select(AuthSelectors.getIsLoggedIn()))
      .pipe(
        filter(value => !(value == null)),
        take(1),
        tap(auth => !auth ? this.store$.dispatch(new RouterActions.Go({path: [Routes.AuthRoute]})) : null),
      );
  }
}
